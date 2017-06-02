sap.ui.define([
	"requisitions_report/controller/BaseController",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper",
	"requisitions_report/utils/formatter"
], function(Controller, DataHelper, Mapper, Formatter) {
	"use strict";

	return Controller.extend("requisitions_report.controller.CandidatesOverview", {

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
			var oTable = this.getView().byId("req_report_candidatesTable");
			oTable.getBinding("items").sort(new sap.ui.model.Sorter("Distance", true));
		},
			
		onRouteMatched: function(oEvent){		
			if(oEvent.getParameter("name") === "candidates") {	
				var ind = oEvent.getParameter("arguments").ind;	
				//var iIndex = this.getModel("ui").getProperty("/requisitions").findIndex(function(r){return r.ReqId == ind});
				var sPath = "/requisitions/" + ind;				
				this.getView().bindElement("ui>" + sPath);
				var reqId = this.getModel("ui").getProperty("/requisitions")[ind].ReqId;
				this.getModel("ui").setProperty("/busy/candidates", true);
				this.loadCandidates(reqId, sPath);
			}			
		},
		
		loadCandidates: function(ReqId, sPath){
			var oModel = this.getModel("ui");
			if(!sPath){
				sPath  = this.getView().getElementBinding("ui").getPath();
			}
			if(!ReqId){
				ReqId = this.getModel("ui").getProperty("/selectedRequisition");
			}
			DataHelper.getCandidates(this, null, null,"ReqId="+ReqId).then(function(oData){
				oModel.setProperty(sPath + "/candidates", Mapper.mapCandidates(oData.data));
				this.getModel("ui").setProperty("/busy/candidates", false);
			}.bind(this));
		},
		
		onShowRequisPopover: function(oEvent){
			if( !this._oRequisPopover ) {
				this._oRequisPopover = sap.ui.xmlfragment("requisitions_report.view.fragment.ReqListPopover", this);
				this.getView().addDependent(this._oRequisPopover);
			}
			var oBinding = oEvent.getSource().getBindingContext("ui");			
			this._oRequisPopover.setBindingContext(oBinding, "ui");
			this._oRequisPopover.openBy(oEvent.getSource());
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
					StatusId : "ASSIGNED",
					flag: "I",
					ProfileId: c2.profiles[0].ProfileId,
					Distance: c2.Distance
				}
			});
			if(aSelectedCandidates.length > 0){
				DataHelper.assignCandidatesToRequisitions({"candidates": aSelectedCandidates}).then(function(response){
					if(response.ERRORS.length == 0){
						var oBundle = this.getResourceBundle();
						var sRequisitionTitle = this.getModel("ui").getProperty("/selectedRequisitionTitle");
						var sProjectId = this.getView().getBindingContext("ui").getObject().ProjectId;
						sap.m.MessageToast.show(oBundle.getText("cand.overview.assigned.toast", [aSelectedCandidates.length, sRequisitionTitle, sProjectId]));
						this.loadCandidates();
					}
				}.bind(this));
			}else{
				sap.m.MessageToast.show(this.getResourceBundle().getText("cand.overview.assign.select"));
			}
		}
		
	});

});