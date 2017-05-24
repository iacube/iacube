sap.ui.define([
	"candidates_search/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(Controller, DataHelper,Mapper) {
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
			if(oEvent.getParameter("name") === "candidate") {
				var iIndex = oEvent.getParameter("arguments").index;				
				var sPath = "/candidates/" + iIndex;				
				this.getView().bindElement("ui>" + sPath);
				
				var CandidateId = this.getModel("ui").getProperty(sPath).CandidateId;
				this.loadCandidate(CandidateId, sPath);
			}			
		},
		loadCandidate: function(CandidateId, sPath){
			var oModel = this.getModel("ui");
			DataHelper.getCandidate(CandidateId).then(function(oData){
				var oCandidate = oModel.getProperty(sPath);
				oModel.setProperty(sPath, jQuery.extend(true, oCandidate, Mapper.mapCandidate(oData.data)));
			});
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