sap.ui.define([
	"manage_vacancy/controller/BaseController",
	"manage_vacancy/util/formatter",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(BaseController, oFormatter, DataHelper, Mapper) {
	"use strict";

	return BaseController.extend("manage_vacancy.controller.DetailVacancy", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
			onInit: function() {
				this.getRouter().getRoute("detail").attachPatternMatched(this._onPatternMatched, this);
			},
			
			_onPatternMatched : function(oEvent) {

			if(oEvent.getParameter("name") === "detail") {

				var iIndex = oEvent.getParameter("arguments").index;
				var sPath = "/JobRequisCollection/" + iIndex;	
				this.getView().bindElement("ui>" + sPath);
				var oModel = this.getModel("ui");
				var ReqId = oModel.getProperty(sPath).ReqId;
				this.loadRequisition(ReqId, sPath);
				}		
			},
			
			loadRequisition: function(ReqId, sPath){
				var oModel = this.getModel("ui");
				DataHelper.getRequisition(ReqId).then(function(oData){
					var oRequisition = oModel.getProperty(sPath);
					oModel.setProperty(sPath, jQuery.extend(true, oRequisition, Mapper.mapRequisition(oData)));
				});
			}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
//			onAfterRendering: function() {
//		
//			},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onExit: function() {
		//
		//	}

	});

});