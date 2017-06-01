sap.ui.define([
	"requisitions_report/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper",
	"requisitions_report/utils/formatter"
], function(Controller, DataHelper, Mapper, Formatter) {
	"use strict";

	return Controller.extend("requisitions_report.controller.Requisition", {
		
		formatter: Formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
			onInit: function() {
				this.getRouter().attachRouteMatched(this.onRouteMatched, this);
			},
			
			
			onAfterRendering(){
				var oTable = this.getView().byId("req_details_cand_table");
				oTable.getBinding("items").sort(new sap.ui.model.Sorter("Distance", true));
			},
			
		/**
		 * Called when event 'route matched' is triggered by the router
		 * Used to bind corresponding object to the view
		 * @param {object} oEvent event parameter
		 * @public
		 */
		onRouteMatched: function(oEvent){		
			if(oEvent.getParameter("name") === "requisition") {
				var iIndex = oEvent.getParameter("arguments").ind;				
				var sPath = "/requisitions/" + iIndex;				
				this.getView().bindElement("ui>" + sPath);
				
				var ReqId = this.getModel("ui").getProperty(sPath).ReqId;
				this.loadRequisition(ReqId, sPath);
			}
			
		},
		
		loadRequisition: function(ReqId, sPath){
			var oModel = this.getModel("ui");
			DataHelper.getRequisition(ReqId).then(function(oData){
				var oRequisition = oModel.getProperty(sPath);
				oModel.setProperty(sPath, jQuery.extend(true, oRequisition, Mapper.mapRequisition(oData.data)));
			});
		},
		
		handleBreadcrumps: function(){
			this.onNavBack();
		},
		
//		onCandidatePress: function(oEvent){
//			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
//			var ind	= sPath.split("/")[2];
//			var ind2	= sPath.split("/")[4];
//			this.getRouter().navTo("candidate", {
//				ind: parseInt(ind),
//				ind2: parseInt(ind2)
//			});
//		}
		
		


	});

});