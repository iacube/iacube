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
		onRequisitionPress: function(oEvent){
			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
			var ReqId = this.getModel("ui").getProperty(sPath).CandidateId;
			var iIndex	= sPath.split("/")[2];
			this.getRouter().navTo("candidate", {
				index: parseInt(iIndex)
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
			DataHelper.getCandidates(this).then(function(aCandidates){
				oModel.setProperty("/candidates", Mapper.mapCandidates(aCandidates.data));
			});
		}

	});

});