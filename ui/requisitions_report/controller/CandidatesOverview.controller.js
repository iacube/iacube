sap.ui.define([
	"requisitions_report/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(Controller, DataHelper, Mapper) {
	"use strict";

	return Controller.extend("requisitions_report.controller.CandidatesOverview", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf manage_vacancy.ui.requisitions_report.view.view.RequisitionsOverview
		 */
		onInit: function() {
			this.getRouter().attachRouteMatched(this.onRouteMatched, this);
		},
			
		onRouteMatched: function(oEvent){		
			if(oEvent.getParameter("name") === "candidatesOverview") {
				var reqId = oEvent.getParameter("arguments").reqId;				
				var sPath = "/requisitions/" + reqId + "/candidates";				
				this.getView().bindElement("ui>" + sPath);

				this.loadCandidates(ReqId, sPath);
			}
			
		},
		
		loadCandidates: function(ReqId, sPath){
			var oModel = this.getModel("ui");
			DataHelper.getCandidates(ReqId).then(function(oData){
				oModel.setProperty(sPath, Mapper.mapCandidates(oData.data));
			});
		}


	});

});