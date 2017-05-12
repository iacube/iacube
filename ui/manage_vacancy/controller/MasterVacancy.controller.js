sap.ui.define([
	"manage_vacancy/controller/BaseController",
	"manage_vacancy/util/formatter"
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("manage_vacancy.controller.MasterVacancy", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
			// onInit: function() {
			// },

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
		//	onExit: function() {
		//
		//	}
		onReqSelected: function(oEvent){
			var context = oEvent.getParameter("listItem").getBindingContext("requis");	  
			var selPath = context.getPath();
			this.getRouter().navTo("detail", {from: "master", ReqId: selPath.substr(("/JobRequisCollection/").length)}, false);
		}
	});

});