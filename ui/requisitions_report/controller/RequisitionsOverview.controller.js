sap.ui.define([
	"requisitions_report/controller/BaseController",
	"iacube/ui/common/dataHelper"
], function(Controller, DataHelper) {
	"use strict";

	return Controller.extend("requisitions_report.controller.RequisitionsOverview", {

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
		onRequisitionPress: function(oEvent){
			var sPath 	= oEvent.getSource().getBindingContext("ui").getPath();
			var iIndex	= sPath.split("/")[2];
			this.getRouter().navTo("requisition", {
				index: parseInt(iIndex)
			});
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
			onAfterRendering: function() {
				//this.loadRequisitions();
			},
		
		loadRequisitions: function(){
			var oModel = this.getModel("ui");
			DataHelper.getRequisitions(this).then(function(aRequisitions){
				oModel.setProperty("/requisitions", DataHelper.composeRequisitions(aRequisitions));
			});
		}

	});

});