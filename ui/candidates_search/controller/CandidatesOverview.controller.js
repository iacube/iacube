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
			
			this.oFilterBar = sap.ui.getCore().byId("__xmlview1--cand_fb");
			this.oFilterBar.setFilterBarExpanded(false);
			
			this.oSearchField = this.oFilterBar.getBasicSearch();
				if (!this.oSearchField) {
					var oBasicSearch = new sap.m.SearchField({
						showSearchButton: false
					});}
				this.oFilterBar.setBasicSearch(oBasicSearch);
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
				sap.ui.getCore().byId("__xmlview1--idCandidates").setVisible(true);
				this.getModel("ui").setProperty("/assignBtnVisible", true);
			}.bind(this));
		},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		onAfterRendering: function() {
				this.loadProfiles();
				this.getModel("ui").setProperty("/assignBtnVisible", false);
		},
		
		onButtonAssignPress: function(){
			
			this.loadRequisitions();
		},
		
		loadRequisitions: function(){
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
		
		handleReqSearch: function(oEvent){
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		onConfirmAssignment: function(oEvent){
			var aCandidates = this.getModel("ui").getProperty("/candidates");
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
		/*	DataHelper.getCandidates(this).then(function(aCandidates){
				oModel.setProperty("/candidates", Mapper.mapCandidates(aCandidates.data));
			});*/
		}

	});

});