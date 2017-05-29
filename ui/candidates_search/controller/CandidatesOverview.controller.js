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
				if (oFilterItem.getName() == "website"  && oControl.getValue()!=""){
					sValueWebsite = oControl.getValue();
					oFilter.ProfileTypeId = sValueWebsite;
					
				}
			}.bind(this));
		
			var oModel = this.getModel("ui");
			
			DataHelper.getCandidates(this,oFilter,sSearchTerm).then(function(aCandidates){
				oModel.setProperty("/candidates", Mapper.mapCandidates(aCandidates.data));
				sap.ui.getCore().byId("__xmlview1--idCandidates").setVisible(true);
			});
		},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		onAfterRendering: function() {
			this.loadCandidates();
		},
		
		loadCandidates: function(){
			var oModel = this.getModel("ui");
		/*	DataHelper.getCandidates(this).then(function(aCandidates){
				oModel.setProperty("/candidates", Mapper.mapCandidates(aCandidates.data));
			});*/
		}

	});

});