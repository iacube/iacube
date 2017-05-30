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

		onAfterRendering : function() {
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
						var oRequisition = Mapper.mapRequisition(oData.data);
						oModel.setProperty(sPath, oRequisition);
					});
		},
		
		reLoadRequisitions : function(sPath) {
			var oModel = this.getModel("ui");
			var that = this;
			DataHelper.getRequisitions(this).then(
					function(aRequisitions) {
						oModel.setProperty("/JobRequisCollection", Mapper
								.mapRequisitions(aRequisitions.data));
						oModel.refresh();
						var ReqId = oModel.getProperty(sPath).ReqId;
						that.loadRequisition(ReqId, sPath);				
					})},

		onRequisSave : function(oEvent) {
			var error = this._validateRequiredFields();
			if (error === false) {
				var oModel = this.getModel("ui");
				var sPath = oEvent.getSource().getBindingContext("ui")
						.getPath();
				var ReqId = oModel.getProperty(sPath).ReqId;
				var that = this;
				var sMode = oModel.getProperty("/Mode");

				if (sMode == "C") {
					// add requisition creation comment during save
					var oRequisition = this._addCreateComment(oEvent);
					DataHelper.updateRequisitions(
							Mapper.composeRequisitionForCreate(oRequisition))
							.then(
									function(oData) {
										that._checkSaveError(sMode, oData, that,
												sPath, oModel, ReqId)
									});
				} else if (sMode == "U") {
					// requisition in update mode
					var oRequisition = oModel.getProperty(sPath);
					var skills = oRequisition.skills;
					oRequisition.candidates = [];
					//add deleted skills if needed
					var aDelSkills = oModel.getProperty("/DeletedSkills");
					if(aDelSkills && aDelSkills.length != "0"){
						for (var i = 0; i < aDelSkills.length; i++)
							oRequisition.skills.push(aDelSkills[i]);
					}
					DataHelper.updateRequisitions(
							Mapper.composeRequisitionForUpdate(oRequisition))
							.then(
									function(oData) {
										that._checkSaveError(sMode, oData, that,
												sPath, oModel, ReqId);
									});
				}
			}
		},

		_checkSaveError : function(sMode, oData, that, sPath, oModel, ReqId) {
			var aErrors = oData.ERRORS;

			var isSuccess = false;
			if (!aErrors || aErrors.length == 0) {
				isSuccess = true;
			} else {
				// get errors
				var errDetails = that._getErrorDetails(aErrors, "DETAILS",
						"Blank skill", "STATUS", "E");
				if (!errDetails) {
					isSuccess = true;
				}
			}
			if (isSuccess) {
				// load Requisition Collection
				if(sMode == "C") {
					that.reLoadRequisitions(sPath);
				}
					
				else if (sMode == "U"){
					that.loadRequisition(ReqId, sPath); 
				}
				oModel.setProperty("/RequisEditable", false);
				oModel.setProperty("/RequisReadOnly", true);
				oModel.setProperty("/TableMode", sap.m.ListMode.None);
			} else {
				var oResBundleModel = that.getModel("i18n");
				var message = oResBundleModel.getResourceBundle().getText(
						"saveError");
				MessageToast.show(message);
			}
		},

		_getErrorDetails : function(aErrors, propName, propValue, status,
				statusValue) {
			for (var i = 0; i < aErrors.length; i++)
				if (aErrors[i][propName] !== propValue
						&& aErrors[i][status] == statusValue)
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
				oModel.setProperty("/RequisEditable", false);
				oModel.setProperty("/RequisReadOnly", true);
				oModel.setProperty("/TableMode", sap.m.ListMode.None);
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
			var oResBundleModel = this.getModel("i18n");
			var sComment = oModel.getProperty(sPath + "/comments/0");
			sComment.CommTitle = oResBundleModel.getResourceBundle().getText(
			"commReqCreated");
			var textReq = oResBundleModel.getResourceBundle().getText(
			"title");
			var textCreated = oResBundleModel.getResourceBundle().getText(
			"created");
			sComment.Text = textReq + Title + textCreated;
			var aComments = oModel.getProperty(sPath).comments;
			aComments.splice(0, 1, sComment);
			return oModel.getProperty(sPath);
		},

		onRequisEdit : function(oEvent) {
			var context = oEvent.getSource().getBindingContext("ui");
			if (!context) {
				this._checkRequisSelected();
			} else {
				// set new model for update
				var oModel = this.getModel("ui");
				var reqStatusCode = oModel.getProperty(context.getPath()).StatusCodeId;
				if(reqStatusCode != "CLOSED"){
				
					oModel.setProperty("/RequisEditable", true);
					oModel.setProperty("/RequisReadOnly", false);
					oModel.setProperty("/TableMode", sap.m.ListMode.Delete);
					oModel.setProperty("/Mode", "U");
				// add update flag for skills
					var aSkills = oModel.getProperty(context.getPath()).skills;
					for (var i = 0; i < aSkills.length; i++)
						aSkills[i].flag = "U"
				}
				else{
					var oResBundleModel = this.getModel("i18n");
					var message = oResBundleModel.getResourceBundle().getText(
							"reqClosed");
					MessageToast.show(message);
				}
			}
		},
		
		onRequisClose: function(oEvent) {
			var context = oEvent.getSource().getBindingContext("ui");
			if (!context) {
				this._checkRequisSelected();
			} else {
				var oModel = this.getModel("ui");
				var oRequisition = oModel.getProperty(context.getPath());
				var oResBundleModel = this.getModel("i18n");
				var that = this;
				
				if (oRequisition.StatusCodeId != "CLOSED"){
					oRequisition.StatusCodeId = "CLOSED";
					oRequisition.skills = [];
					oRequisition.comments = [];
					oRequisition.candidates = [];
					DataHelper.updateRequisitions(
							Mapper.composeRequisitionForUpdate(oRequisition))
							.then(
									function(oData) {
										if (!oData.ERRORS || oData.ERRORS.length == 0){
											that.loadRequisition(oRequisition.ReqId, context.getPath()); 
											var message = oResBundleModel.getResourceBundle().getText(
											"closedReq");
											MessageToast.show(message);
										}
										else {
											var message = oResBundleModel.getResourceBundle().getText(
													"saveError");
											MessageToast.show(message);
										}
									});
					
				}
			}
		},
		
		_checkRequisSelected: function(){
			var oResBundleModel = this.getModel("i18n");
			var message = oResBundleModel.getResourceBundle().getText(
					"editError");
			MessageToast.show(message);
		}

	});

});