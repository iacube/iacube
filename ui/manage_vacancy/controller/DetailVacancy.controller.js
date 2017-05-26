sap.ui.define([
	"manage_vacancy/controller/BaseController",
	"manage_vacancy/util/formatter",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper",
	"sap/m/MessageToast"
], function(BaseController, oFormatter, DataHelper, Mapper, MessageToast) {
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
					oModel.setProperty(sPath, jQuery.extend(true, oRequisition, Mapper.mapRequisition(oData.data)));
				});
			},
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
			
			onRequisSave: function(oEvent) {
				var error = this._validateRequiredFields();
				if (error === false) {
					var oModel = this.getModel("ui");
					var sPath = oEvent.getSource().getBindingContext("ui").getPath();		
					var ReqId = oModel.getProperty(sPath).ReqId;
// add requisition creation comment during save
					if(ReqId === "0000") {
							var oRequisition = this._addCreateComment(oEvent);
							DataHelper.createRequisition(Mapper.composeRequisitionForCreate(oRequisition)).then(function(oData){
								 if(oData.message=="S"){
								 }else{
								  console.log(oData);
								 }
								});
						}
					}
			},
			
			onRequisCancel: function(oEvent) {
// check if requisition in create mode
				var oModel = this.getModel("ui");
				var sPath = oEvent.getSource().getBindingContext("ui").getPath();		
				var ReqId = oModel.getProperty(sPath).ReqId;
				if(ReqId === "0000") {
					var index = parseInt(sPath.substring(sPath.lastIndexOf('/') +1));
		            var aRequisitions = oModel.getProperty("/JobRequisCollection");
		            aRequisitions.splice(index, 1);
		            oModel.setData(aRequisitions, true)
		            var oEventBus = sap.ui.getCore().getEventBus();
					oEventBus.publish("DetailVacancy", "RequisCancel", index);
				}
// requisition in edit mode
				else {
					this.loadRequisition(ReqId, sPath);
				}
			},
			
			_validateRequiredFields: function(){
				var oReqTitle = sap.ui.getCore().byId("idPos");
				var error = false;
				var reqTitleVal = oReqTitle.getValue();
				if(reqTitleVal === ""){
					oReqTitle.setValueState("Error").focus();
					error = true;
				}
				var oReqProj = sap.ui.getCore().byId("idProj");
				var reqProjVal = oReqProj.getValue();
				if(reqProjVal === ""){
					oReqProj.setValueState("Error").focus();
					error = true;
				}
				
				var oReqPrior = sap.ui.getCore().byId("idPrior");
				var reqPriorVal = oReqPrior.getValue();
				if(reqPriorVal === ""){
					oReqPrior.setValueState("Error").focus();
					error = true;
				}
				
				var oReqLocation = sap.ui.getCore().byId("idLocation");
				var reqLocationVal = oReqLocation.getValue();
				if(reqLocationVal === ""){
					oReqLocation.setValueState("Error").focus();
					error = true;
				}
				
				return error;
			},
			
			_addCreateComment: function(oEvent) {
				var oModel = this.getModel("ui");
				var sPath = oEvent.getSource().getBindingContext("ui").getPath();
				var Title = oModel.getProperty(sPath).Title;
				var sComment = oModel.getProperty(sPath + "/comments/0");
				sComment.CommTitle = "created Job Requisition";
				sComment.Text = "Requisition " + Title + " created";
				var aComments = oModel.getProperty(sPath).comments;
				aComments.splice(0, 1, sComment);
				return oModel.getProperty(sPath);
			}

	});

});