sap.ui.define([
	"candidates_search/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(Controller, DataHelper, Mapper) {
	"use strict";

	return Controller.extend("candidates_search.controller.CandidatesOverview", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		onInit: function() {
			
		
		},
			
		/**
		 * Event handler for Press event on subproject item of the table
		 * Navigates to corresponding subproject details page vis routing
		 * @param {object} oEvent Event parameter
		 * @public
		 */
		handleCandidatePress: function(oEvent){
			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
			var CandId = this.getModel("ui").getProperty(sPath).CandidateId;
			var iIndex	= sPath.split("/")[2];
			this.getRouter().navTo("candidate", {
				index: parseInt(iIndex)
			});
		},
		
		onSearch :function(oEvent){
			var oSearchField = this.oFilterBar.getBasicSearch();
			var sSearchTerm = sap.ui.getCore().byId(oSearchField).getValue()!="" ? sap.ui.getCore().byId(oSearchField).getValue(): null;
			var oFilter = {};
			var sValueLocation;
			var sValueWebsite;
			this.oFilterBar.getFilterItems().forEach(function(oFilterItem){
				var oControl = this.oFilterBar.determineControlByFilterItem(oFilterItem);
				if (oFilterItem.getName() == "location" && oControl.getValue()!=""){
					sValueLocation = oControl.getValue();
					oFilter.Location = sValueLocation;
				}
				if (oFilterItem.getName() == "website"  && oControl.getSelectedKey()!=""){
					sValueWebsite = oControl.getSelectedKey();
					oFilter.ProfileTypeId = sValueWebsite;
					
				}
			}.bind(this));
		
			var oModel = this.getModel("ui");
			
			DataHelper.getCandidates(this,oFilter,sSearchTerm).then(function(aCandidates){
				oModel.setProperty("/candidates", Mapper.mapCandidates(aCandidates.data));
				this.getView().byId("idCandidates").setVisible(true);
				this.getModel("ui").setProperty("/assignBtnVisible", true);
			}.bind(this));
		},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		onBeforeRendering: function(){
			this.loadFilterBar();
		},
		onAfterRendering: function() {
				this.loadProfiles();
				var sVisible = this.getView().byId("idCandidates").getVisible();
				this.getModel("ui").setProperty("/assignBtnVisible", sVisible);
		},
		
		onButtonAssignPress: function(){
			
			this.loadRequisitions();
		},
		
		loadFilterBar: function(){
			
			this.oFilterBar = this.getView().byId("cand_fb");
			this.oFilterBar.setFilterBarExpanded(false);
			
			this.oSearchField = this.oFilterBar.getBasicSearch();
				if (!this.oSearchField) {
					var oBasicSearch = new sap.m.SearchField({
						showSearchButton: false
					});
					this.oFilterBar.setBasicSearch(oBasicSearch);
					}
				
				var oVM = this.oFilterBar._oVariantManagement;
				oVM.setVisible(true);
				oVM.initialise = function() {
					this.fireEvent("initialise");
					this._setStandardVariant();
		 
					this._setSelectedVariant();
				};
		 
				var nKey = 0;
				var mMap = {};
				var sCurrentVariantKey = null;
				oVM._oVariantSet = {
		 
					getVariant: function(sKey) {
						return mMap[sKey];
					},
					addVariant: function(sName) {
						var sKey = "" + nKey++;
		 
						var oVariant = {
							key: sKey,
							name: sName,
							getItemValue: function(s) {
								return this[s];
							},
							setItemValue: function(s, oObj) {
								this[s] = oObj;
							},
							getVariantKey: function() {
								return this.key;
							}
						};
						mMap[sKey] = oVariant;
		 
						return oVariant;
					},
					setCurrentVariantKey: function(sKey) {
						sCurrentVariantKey = sKey;
					},
					getCurrentVariantKey: function() {
						return sCurrentVariantKey;
					},
					delVariant: function(sKey) {
						if (mMap[sKey]) {
							delete mMap[sKey];
						}
					}
		 
				
			}
		},
		loadRequisitions: function(){
			var oModel = this.getModel("ui");
			var oBundle = this.getResourceBundle();
			this.oSelectedCand =[];
			var aCandidates = this.getModel("ui").getProperty("/candidates");
			aCandidates.forEach(function(oCand){
				if (oCand.selected) this.oSelectedCand.push(oCand);
			}.bind(this));
			if (this.oSelectedCand.length>0){
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
			}
			else {
				sap.m.MessageToast.show(oBundle.getText("cand.overview.noCandidates"))
			}
		},
		
		handleReqSearch: function(oEvent){
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		onConfirmAssignment: function(oEvent){
			var aSelectedCandidates = [];
			var oSelectedCandidate ={};
			
			var aCandidates = this.getModel("ui").getProperty("/candidates");
			var oSelectedReqContexts = oEvent.getParameter("selectedContexts");
			if(oSelectedReqContexts.length != "0"){
				for (var c=0; c<aCandidates.length; c++){
						if (aCandidates[c].selected){
							oSelectedCandidate.CandidateId = aCandidates[c].CandidateId;
							oSelectedCandidate.ProfileId = aCandidates[c].profiles[0].ProfileId;
							oSelectedCandidate.Distance=aCandidates[c].Distance;
							oSelectedCandidate.StatusId = "ASSIGNED";
						
						for (var r=0;r<oSelectedReqContexts.length;r++){
							var oSelReq=oSelectedReqContexts[r].oModel.getObject(oSelectedReqContexts[r].sPath);
							oSelectedCandidate.ReqId = oSelReq.ReqId;
							oSelectedCandidate.flag ="I";						
							aSelectedCandidates.push($.extend({},oSelectedCandidate));
						}
					}
				};
				var aSelCandidates= {"candidates": aSelectedCandidates};
				DataHelper.assignCandidatesToRequisitions(aSelCandidates).then(function(response){
					if(response.ERRORS.length == 0){
						this.onSearch();
						 this.getModel("ui").refresh(true);
				     }
				}.bind(this));
			}
			else{
				var oBundle = this.getResourceBundle();
				sap.m.MessageToast.show(oBundle.getText("cand.overview.noRequisitions"))
			}
		},
		handleClose: function(){
			if (this._oReqDialog) {
				this._oReqDialog.destroy();
			}
		},
		
		loadProfiles: function(){
			var oModel = this.getModel("ui");
			DataHelper.getCandidates(this).then(function(aProfiles){
				oModel.setProperty("/profileTypes", Mapper.mapProfilesFilter(aProfiles.filter.ProfileTypeId.values));
			});
		},
		
		onIconPress: function (oEvent) {
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("candidates_search.view.fragment.ProfPopover", this);
				this.getView().addDependent(this._oPopover);
			}
			
				var oIcon= oEvent.getSource();
				var oContext = oIcon.getBindingContext("ui");
				this._oPopover.setBindingContext(oContext, "ui");
				jQuery.sap.delayedCall(0, this, function () {
				this._oPopover.openBy(oIcon);
			});
		},
		
		onRequisPress: function(oEvent) {
			if (!this._oRequisPopover) {
				this._oRequisPopover = sap.ui.xmlfragment("candidates_search.view.fragment.RequisPopover", this);
				this.getView().addDependent(this._oRequisPopover);
			}
			
				var oIcon= oEvent.getSource();
				var oContext = oIcon.getBindingContext("ui");
				this._oRequisPopover.setBindingContext(oContext, "ui");
				jQuery.sap.delayedCall(0, this, function () {
				this._oRequisPopover.openBy(oIcon);
			});
		}

	});

});