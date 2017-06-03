sap.ui.define([
	"candidates_search/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(Controller, DataHelper,Mapper) {
	"use strict";

	return Controller.extend("candidates_search.controller.Candidate", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
			onInit: function() {
				this.getRouter().attachRouteMatched(this.onRouteMatched, this);
			},
			
		/**
		 * Called when event 'route matched' is triggered by the router
		 * Used to bind corresponding object to the view
		 * @param {object} oEvent event parameter
		 * @public
		 */
		onRouteMatched: function(oEvent){		
			if(oEvent.getParameter("name") === "candidate") {
				var iIndex = oEvent.getParameter("arguments").index;				
				var sPath = "/candidates/" + iIndex;				
				this.getView().bindElement("ui>" + sPath);
				
				var CandidateId = this.getModel("ui").getProperty(sPath).CandidateId;
				this.loadCandidate(CandidateId, sPath);
				this.getModel("ui").setProperty("/assignBtnVisible", true);
			}			
		},
		loadCandidate: function(CandidateId, sPath){
			var oModel = this.getModel("ui");
			DataHelper.getCandidate(CandidateId).then(function(oData){
				var oCandidate = oModel.getProperty(sPath);
				oModel.setProperty(sPath, jQuery.extend(true, oCandidate, Mapper.mapCandidate(oData)));
				this.setSelectedProfileText(sPath, 0);
			}.bind(this));
		},
		
	/*	onNavBack: function(oEvent){
			this.getOwnerComponent().getRouter().getTargets().display("home");
			this.getModel("ui").setProperty("/assignBtnVisible", true);
		},*/
		
		onProfileSelectorShow: function(oEvent){
			if (!this.oProfilesPopover) {
				this.oProfilesPopover = sap.ui.xmlfragment("candidates_search.view.fragment.profilesPopover", this);
				this.getView().addDependent(this.oProfilesPopover);
			}
			this.oProfilesPopover.openBy(oEvent.getParameter("domRef"));
			//this.oProfilesPopover.setModel("ui",this.getModel("ui"));
		},
		
		onProfileSelected: function(oEvent){
			var oContext = this.getView().getBindingContext("ui");
			var oList = sap.ui.getCore().byId("cand_page_popover_profiles_list");
			var iIndex = oList.indexOfItem(oList.getSelectedItem());//index of selected profile
			var oBundle = this.getResourceBundle();
			if (iIndex<0){
				sap.m.MessageToast.show(oBundle.getText("cand.page.noProfileSelected"));
			}else{
				var oInfoForm = this.getView().byId("cand_page_info_form");
				oInfoForm.bindProperty("Link", {
					model 	: "ui",
					path	: "profiles/"+iIndex+"/Link"
				}).bindProperty("Summary", {
					model 	: "ui",
					path	: "profiles/"+iIndex+"/Summary"
				});
				
				var oSkillsForm = this.getView().byId("cand_page_skills_form");
				oSkillsForm.bindProperty("skills", {
					model 	: "ui",
					path	: "profiles/"+iIndex+"/skills"
				});
				
				this.setSelectedProfileText(oContext.getPath(), iIndex);
				
			}
		},
		
		setSelectedProfileText: function(sPath, iIndex){
			var sSelectedHeadline = this.getModel("ui").getProperty(sPath+"/profiles/"+iIndex+"/Headline");
			var sSelectedLocation = this.getModel("ui").getProperty(sPath+"/Location");
			this.getModel("ui").setProperty(sPath+"/selectedProfile", sSelectedLocation + " / " + sSelectedHeadline);
		},
		
		onButtonAssignPress: function(){
			
			this.loadRequisitions();
		},
		
		loadRequisitions: function(oEvent){
			var oModel = this.getModel("ui");			
			var oFilter = {"StatusCodeId":"OPEN"};
			DataHelper.getRequisitions(this,oFilter).then(function(aRequisitions){
				oModel.setProperty("/openRequisitions", Mapper.mapRequisitions(aRequisitions.data));
				if (! this._oReqDialog) {
					this._oReqDialog = sap.ui.xmlfragment("candidates_search.view.fragment.requsitionsDialog", this);
					this.getView().addDependent(this._oReqDialog);
					this._oReqDialog.setModel(oModel);
				}
		 
				this._oReqDialog.setMultiSelect(true);
		 
				// clear the old search filter
				this._oReqDialog.getBinding("items").filter([]);
		 
				// toggle compact style
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oReqDialog);
				this._oReqDialog.open();
			}.bind(this));
		},
		handleBreadcrumps: function(){
			this.onNavBack();
		},		

		handleReqSearch: function(oEvent){
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
		onConfirmAssignment: function(oEvent){
			var oBundle = this.getResourceBundle();
			var oSelectedReqContexts = oEvent.getParameter("selectedContexts");
			if(oSelectedReqContexts.length != "0"){
				var aSelectedCandidates = [];
				var oSelectedCandidate = {};
				var sPath = this.getView().getBindingContext("ui").getPath();
				var oCandidate = this.getModel("ui").getProperty(sPath);
				
				oSelectedCandidate.CandidateId = oCandidate.CandidateId;
				oSelectedCandidate.ProfileId = oCandidate.profiles[0].ProfileId;
				oSelectedCandidate.Distance=oCandidate.Distance;
				oSelectedCandidate.StatusId = "ASSIGNED";
					
				for (var r=0;r<oSelectedReqContexts.length;r++){
					var oSelReq=oSelectedReqContexts[r].oModel.getObject(oSelectedReqContexts[r].sPath);
					oSelectedCandidate.ReqId = oSelReq.ReqId;
					oSelectedCandidate.flag ="I";						
					aSelectedCandidates.push($.extend({},oSelectedCandidate));
					};
	
			var aSelCandidates= {"candidates": aSelectedCandidates};
			DataHelper.assignCandidatesToRequisitions(aSelCandidates).then(function(response){
				if(response.ERRORS.length == 0){
					sap.m.MessageToast.show(oBundle.getText("cand.overview.candidateAssigned"));
					this.getModel("ui").refresh(true);
			     }
			}.bind(this));
			}
			else{
				sap.m.MessageToast.show(oBundle.getText("cand.overview.noRequisitions"))
			}
			
		},
		
		
		
		handleClose: function(){
			if (this._oReqDialog) {
				this._oReqDialog.destroy();
			}
		},
	
		

	});

});