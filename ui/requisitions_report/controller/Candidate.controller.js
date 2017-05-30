sap.ui.define([
	"requisitions_report/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(Controller, DataHelper, Mapper) {
	"use strict";

	return Controller.extend("requisitions_report.controller.Candidate", {

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
				var ind = oEvent.getParameter("arguments").ind;				
				var ind2 = oEvent.getParameter("arguments").ind2;				
				var sPath = "/requisitions/" + ind + "/candidates/" + ind2;				
				this.getView().bindElement("ui>" + sPath);
				
				var CandId = this.getModel("ui").getProperty(sPath+"/CandidateId");
				this.loadCandidate(CandId, sPath);
			}
		},
		
		loadCandidate: function(CandId, sPath){
			var oModel = this.getModel("ui");
			DataHelper.getCandidate(CandId).then(function(oData){
				//We don't want to overwrite existing candidate data, just extend
				var oCandidate = oModel.getProperty(sPath);
				oModel.setProperty(sPath, jQuery.extend({}, oCandidate, Mapper.mapCandidate(oData)));
			});
		},
		
		onProfileSelectorShow: function(oEvent){
			if (!this.oProfilesPopover) {
				this.oProfilesPopover = sap.ui.xmlfragment("requisitions_report.view.fragment.profilesPopover", this);
				this.getView().addDependent(this.oProfilesPopover);
			}
			this.oProfilesPopover.openBy(oEvent.getParameter("domRef"));
			//this.oProfilesPopover.setModel("ui",this.getModel("ui"));
		},
		
		onProfileSelected: function(oEvent){
			var oContext = this.getView().getBindingContext("ui");
			var oList = sap.ui.getCore().byId("cand_page_popover_profiles_list");
			var iIndex = oList.indexOfItem(oList.getSelectedItem());//index of selected profile
			
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
			
			var sSelectedHeadline = this.getModel("ui").getProperty(oContext.getPath()+"/profiles/"+iIndex+"/Headline");
			var sSelectedLocation = this.getModel("ui").getProperty(oContext.getPath()+"/Location");
			this.getModel("ui").setProperty(oContext.getPath()+"/selectedProfile", sSelectedLocation + " / " + sSelectedHeadline);
		},
		
		onCandidateAssign: function(){
			var sCandId = this.getView().getBindingContext("ui").getProprty("CandidateId");
			var sReqId = this.getModel("ui").getProperty("/selectedRequisition");
			var aSelectedCandidates = [{
					ReqId: sReqId,
					CandidateId	: sCandId,
					StatusId : "OPEN",
					flag: "I"
				}];
			DataHelper.assignCandidatesToRequisitions(aSelectedCandidates).then(function(){
				console.log("ok");
			});

		}
		

	});

});