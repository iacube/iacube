sap.ui.define([
	"requisitions_report/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper",
	"requisitions_report/utils/formatter"
], function(Controller, DataHelper, Mapper, Formatter) {
	"use strict";

	return Controller.extend("requisitions_report.controller.RequisitionsOverview", {

		formatter: Formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		 onInit: function() {
			 this.getRouter().attachRouteMatched(this.onRouteMatched, this);
		 },
		 
		 onRouteMatched: function(oEvent){		
			 if(oEvent.getParameter("name") === "home") {	
				this.loadRequisitions();
			 }			
		 },
		 
		 onSearch :function(oEvent){
			 var oFilter = {};
			 var sValueLocation;
			 var sValueWebsite;
			 this.oFilterBar.getFilterItems().forEach(function(oFilterItem){
				 var oControl = this.oFilterBar.determineControlByFilterItem(oFilterItem);
				 if (oFilterItem.getName() == "req_id" && oControl.getValue()!=""){
					 oFilter.ReqId = oControl.getValue();
				 }
				 if (oFilterItem.getName() == "req_name" && oControl.getValue()!=""){
					 oFilter.Title = oControl.getValue();
				 }
				 if (oFilterItem.getName() == "req_subcategory"  && oControl.getSelectedKey()!=""){
					 oFilter.SubcategoryId = oControl.getSelectedKey();					
				 }
				 if (oFilterItem.getName() == "req_status"  && oControl.getSelectedKey()!=""){
					 oFilter.StatusCodeId = oControl.getSelectedKey();						
				 }
			 }.bind(this));			
			 this.loadRequisitions(oFilter);
		 },
			
		/**
		 * Event handler for Press event on subproject item of the table
		 * Navigates to corresponding subproject details page vis routing
		 * @param {object} oEvent Event parameter
		 * @public
		 */
		onRequisitionPress: function(oEvent){
			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
			var ReqId = this.getModel("ui").getProperty(sPath).ReqId;
			var iIndex	= sPath.split("/")[2];
			this.getModel("ui").setProperty("/selectedRequisitionIndex", iIndex);
			this.getRouter().navTo("requisition", {
				ind: parseInt(iIndex)
			});			
		},
		
		onRequisitionSelect: function(oEvent){
			var oModel = this.getModel("ui");
			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
			var iReqId = oModel.getProperty(sPath).ReqId;
			var iIndex	= sPath.split("/")[2];
			oModel.setProperty("/selectedRequisition", iReqId);
			oModel.setProperty("/selectedRequisitionIndex", iIndex);
			oModel.setProperty("/selectedRequisitionTitle", oModel.getProperty(sPath+"/Title"));
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		onAfterRendering: function() {
			this.getModel("ui").setProperty("/busy/requisitions", true);
			this.loadFilterBar();
		},
		
		loadRequisitions: function(oFilter){
			var oModel = this.getModel("ui");
			DataHelper.getRequisitions(this, oFilter).then(function(aRequisitions){
				oModel.setProperty("/requisitions", Mapper.mapRequisitions(aRequisitions.data));
				oModel.setProperty("/subcategoryIds", Mapper.mapSubcategoryIds(aRequisitions.filter.SubcategoryId));
				oModel.setProperty("/statusCodes", Mapper.mapStatusCodes(aRequisitions.filter.StatusCodeId, Formatter, this.getResourceBundle()));
				this.getModel("ui").setProperty("/busy/requisitions", false);
			}.bind(this));
		},
		

		
		onShowCandPopover: function(oEvent){
			if( !this._oCandPopover ) {
				this._oCandPopover = sap.ui.xmlfragment("requisitions_report.view.fragment.CandPopover", this);
				this.getView().addDependent(this._oCandPopover);
			}
			var oBinding = oEvent.getSource().getBindingContext("ui");			
			this._oCandPopover.setBindingContext(oBinding, "ui");
			this._oCandPopover.openBy(oEvent.getSource());
		},
	
		
		onShowCandidates: function(oEvent){
			var iIndex = this.getModel("ui").getProperty("/selectedRequisitionIndex");
			this.getRouter().navTo("candidates", {
				ind: parseInt(iIndex)
			});
		},
		
		loadFilterBar: function(){			
			this.oFilterBar = this.getView().byId("req_fb");
			this.oFilterBar.setFilterBarExpanded(false);
				
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
		}

	});

});