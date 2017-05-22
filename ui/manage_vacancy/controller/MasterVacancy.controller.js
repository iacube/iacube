sap.ui.define([
	"manage_vacancy/controller/BaseController",
	"manage_vacancy/util/formatter",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(BaseController, formatter, DataHelper, Mapper) {
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
		onAfterRendering: function() {
			this.loadRequisitions();
		},
		
		loadRequisitions: function(){
			var oModel = this.getModel("ui");
			DataHelper.getRequisitions(this).then(function(aRequisitions){
				oModel.setProperty("/JobRequisCollection", Mapper.mapRequisitions(aRequisitions.data));
			});
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
		//	onExit: function() {
		//
		//	}
		onReqSelected: function(oEvent){
			var context = oEvent.getParameter("listItem").getBindingContext("ui");	  
			var selPath = context.getPath();
			this.getRouter().navTo("detail", {from: "master", index: selPath.substr(("/JobRequisCollection/").length)}, false);
		}
	});

});