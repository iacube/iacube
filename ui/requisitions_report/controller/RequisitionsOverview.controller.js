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
			   var req_fb = sap.ui.getCore().byId("__xmlview1--req_fb");
			   req_fb._oVariantManagement.addItem(new sap.ui.comp.variants.VariantItem({text:"Status: Opened", key:"1"}));
			   req_fb._oVariantManagement.addItem(new sap.ui.comp.variants.VariantItem({text:"Account: BURB-SAP", key:"2"}));
			   req_fb._oVariantManagement.setVisible(true);
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
			this.getRouter().navTo("requisition", {
				index: parseInt(iIndex)
			});
		},
		
		onRequisitionSelect: function(oEvent){
			var oModel = this.getModel("ui");
			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
			var iReqId = oModel.getProperty(sPath).ReqId;
			oModel.setProperty("/selectedRequisition", iReqId);
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		onAfterRendering: function() {
			this.loadRequisitions();
		},
		
		loadRequisitions: function(){
			var oModel = this.getModel("ui");
			DataHelper.getRequisitions(this).then(function(aRequisitions){
				oModel.setProperty("/requisitions", Mapper.mapRequisitions(aRequisitions.data));
			});
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
			var reqId = this.getModel("ui").getProperty("/selectedRequisition");
			this.getRouter().navTo("candidates", {
				reqId: parseInt(reqId)
			});
		}

	});

});