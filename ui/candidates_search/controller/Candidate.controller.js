sap.ui.define([
	"requisitions_report/controller/BaseController",
	"iacube/ui/common/dataHelper"
], function(Controller, DataHelper) {
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
			if(oEvent.getParameter("name") === "config") {
				var iIndex = oEvent.getParameter("arguments").index;				
				var sPath = "/candidates/" + iIndex;				
				this.getView().bindElement("ui>" + sPath);
			}			
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		// onAfterRendering: function() {
		// 	
		// },

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		//	onExit: function() {
		//
		//	}
		

	});

});