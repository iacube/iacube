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
			if(oEvent.getParameter("name") === "candidates") {	
				var reqId = oEvent.getParameter("arguments").reqId;	
				var iIndex = this.getModel("ui").getProperty("/requisitions").findIndex(function(r){return r.ReqId == reqId});
				var sPath = "/requisitions/" + iIndex;				
				this.getView().bindElement("ui>" + sPath);

				this.loadCandidates(reqId, sPath);
			}			
		},
		
		loadCandidates: function(ReqId, sPath){
			var oModel = this.getModel("ui");			
			DataHelper.getCandidates(ReqId).then(function(oData){
				oModel.setProperty(sPath + "/candidates", Mapper.mapCandidates(oData.data));
			});
		},
		
		onProfilesPopover: function(oEvent){
			if( !this._oProfPopover ) {
				this._oProfPopover = sap.ui.xmlfragment("requisitions_report.view.fragment.ProfPopover", this);
				this.getView().addDependent(this._oProfPopover);
			}
			var oBinding = oEvent.getSource().getBindingContext("ui");			
			this._oProfPopover.setBindingContext(oBinding, "ui");
			this._oProfPopover.openBy(oEvent.getSource());
		},
		
		onAssignCandidates: function(oEvent){
			var oContext = this.getView().getBindingContext("ui");
			var sReqId = this.getModel("ui").getProperty("/selectedRequisition");
			var aCandidates = this.getModel("ui").getProperty(oContext.getPath() + "/candidates");
			var aSelectedCandidates = aCandidates.filter(function(c){
				return c.selected
			}).map(function(c2){
				return {
					ReqId: sReqId,
					CandidateId	: c2.CandidateId,
					StatusId : "OPEN",
					flag: "I"
				}
			});
			DataHelper.assignCandidatesToRequisitions(aSelectedCandidates).then(function(){
				console.log("ok");
			});
		}

	});

});