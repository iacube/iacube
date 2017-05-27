sap.ui.define([ "manage_vacancy/controller/BaseController",
		"manage_vacancy/util/formatter", "iacube/ui/common/dataHelper",
		"iacube/ui/common/mapper", "sap/m/MessageToast" ], function(
		BaseController, oFormatter, DataHelper, Mapper, MessageToast) {
	"use strict";

	return BaseController.extend("manage_vacancy.controller.DetailVacancy", {

		onInit : function() {
			this.getRouter().getRoute("detail").attachPatternMatched(
					this._onPatternMatched, this);
		},
		
		onAfterRendering: function() {
			var oModel = this.getModel("ui");
		},

		_onPatternMatched : function(oEvent) {

			if (oEvent.getParameter("name") === "detail") {

				var iIndex = oEvent.getParameter("arguments").index;
				var sPath = "/JobRequisCollection/" + iIndex;
				this.getView().bindElement("ui>" + sPath);
				var oModel = this.getModel("ui");
				var ReqId = oModel.getProperty(sPath).ReqId;
				if (ReqId != "") {
					this.loadRequisition(ReqId, sPath);
				}
			}
		},

		loadRequisition : function(ReqId, sPath) {
			var oModel = this.getModel("ui");
			DataHelper.getRequisition(ReqId).then(
					function(oData) {
						var oRequisition = oModel.getProperty(sPath);
						oModel.setProperty(sPath, jQuery
								.extend(true, oRequisition, Mapper
										.mapRequisition(oData.data)));
					});
		},

		onRequisSave : function(oEvent) {
			var error = this._validateRequiredFields();
			if (error === false) {
				var oModel = this.getModel("ui");
				var sPath = oEvent.getSource().getBindingContext("ui")
						.getPath();
				var ReqId = oModel.getProperty(sPath).ReqId;
				var that = this;
				var oResBundleModel = this.getModel("i18n");

				if (ReqId === "") {
					// add requisition creation comment during save
					var oRequisition = this._addCreateComment(oEvent);
					DataHelper.createRequisition(
							Mapper.composeRequisitionForCreate(oRequisition))
							.then(
									function(oData) {
										var aErrors = oData.ERRORS;
										
										var isSuccess = false;
										if (aErrors.length === 0){
											isSuccess = true;
										}
										else {
											// get errors
											var errDetails = that._getErrorDetails(aErrors, "DETAILS", "Blank skill", "STATUS", "E");
											if(!errDetails){
												isSuccess = true;
											}
										}
										if (isSuccess) {
											// load Requisition Collection
											var oEventBus = sap.ui.getCore()
													.getEventBus();
											oEventBus.publish("DetailVacancy",
													"RequisSave", sPath);
											oModel.setProperty(
													"/RequisEditable", false);
										} else {
											var message = oResBundleModel.getResourceBundle().getText("saveError");
											MessageToast.show(message); 
										}
									});			
				};
			}
		},
		
		_getErrorDetails: function(aErrors, propName, propValue, status, statusValue){
			 for (var i=0; i < aErrors.length; i++)
				    if (aErrors[i][propName] !== propValue && aErrors[i][status] == statusValue)
				      return aErrors[i];
		},

		onRequisCancel : function(oEvent) {
			// check if requisition in create mode
			var oModel = this.getModel("ui");
			var sPath = oEvent.getSource().getBindingContext("ui").getPath();
			var ReqId = oModel.getProperty(sPath).ReqId;
			if (ReqId === "") {
				var index = parseInt(sPath
						.substring(sPath.lastIndexOf('/') + 1));
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

		_validateRequiredFields : function() {
			var oReqTitle = sap.ui.getCore().byId("idPos");
			var error = false;
			var reqTitleVal = oReqTitle.getValue();
			if (reqTitleVal === "") {
				oReqTitle.setValueState("Error").focus();
				error = true;
			}
			var oReqProj = sap.ui.getCore().byId("idProj");
			var reqProjVal = oReqProj.getValue();
			if (reqProjVal === "") {
				oReqProj.setValueState("Error").focus();
				error = true;
			}

			var oReqPrior = sap.ui.getCore().byId("idPrior");
			var reqPriorVal = oReqPrior.getValue();
			if (reqPriorVal === "") {
				oReqPrior.setValueState("Error").focus();
				error = true;
			}

			var oReqLocation = sap.ui.getCore().byId("idLocation");
			var reqLocationVal = oReqLocation.getValue();
			if (reqLocationVal === "") {
				oReqLocation.setValueState("Error").focus();
				error = true;
			}

			return error;
		},

		_addCreateComment : function(oEvent) {
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