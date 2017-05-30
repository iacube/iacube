sap.ui.define([ "sap/suite/ui/commons/Timeline",
		"sap/suite/ui/commons/TimelineItem", "iacube/ui/common/formatterCom",
		"sap/m/Button", "sap/m/Select", "sap/m/TextArea", "sap/m/Dialog",
		"sap/ui/core/Item", "sap/m/Label", "iacube/ui/common/dataHelper",
		"iacube/ui/common/mapper", "sap/m/MessageToast" ], function(Timeline,
		TimelineItem, oFormatterCom, Button, Select, TextArea, Dialog, Item,
		Label, DataHelper, Mapper, MessageToast) {
	"use strict";

	return Timeline.extend("iacube.ui.common.Comments", {

		init : function() {
			Timeline.prototype.init.apply(this, arguments);
			this._bInitialized = false;
		},

		onBeforeRendering : function() {
			Timeline.prototype.onBeforeRendering.apply(this, arguments);
			if (!this._bInitialized) {
				this._createContent();
				this._bInitialized = true;
				this._oTimeline = this;
			}
		},

		_createContent : function() {

			var oTemplateItem = new TimelineItem(
					{
						dateTime : "{ui>CommCreatedAt}",
						text : "{ui>Text}",
						userName : "{ui>CommCreatedBy}",
						title : "{ui>CommTitle}",
						filterValue : {
							parts : [ {
								path : "ui>CommentTypeId"
							}, {
								path : "i18nCom>commIdCall"
							}, {
								path : "i18nCom>commIdNote"
							}, {
								path : "i18nCom>commIdEmail"
							}, {
								path : "i18nCom>commIdOther"
							} ],
							formatter : function(sCommId, sCommCall, sCommNote,
									sCommEmail, sCommOther) {
								return oFormatterCom.getCommentType(sCommId,
										sCommCall, sCommNote, sCommEmail,
										sCommOther);
							}
						},
						userNameClickable : true,
						icon : {
							path : "ui>CommentTypeId",
							formatter : function(sCommId) {
								return oFormatterCom.getCommentIcon(sCommId);
							}
						},

						status : {
							path : "ui>CommentStatusId",
							formatter : function(sCommentStatusId) {
								return oFormatterCom
										.getCommentStatus(sCommentStatusId);
							}
						}
					});

			this.setEnableScroll(false);
			this.setEnableDoubleSided(true);
			this.bindAggregation("content", "ui>comments", oTemplateItem);

			var addButton = new Button({
				icon : "sap-icon://add",
				type : sap.m.ButtonType.Transparent
			});

			var that = this;

			addButton.attachPress(function(oEvent) {
				that._onCommentAdd(oEvent, that)
			});
			this._headerBar.addAggregation("content", addButton, true)

		},
		_onCommentAdd : function(oEvent, that) {
			var context = that.getBindingContext("ui");
			if (context) {

				var oModel = that.getModel("ui");

				// add comments types
				var aCommTypes = [ {
					CommentTypeId : "NOTE"
				}, {
					CommentTypeId : "CALL"
				}, {
					CommentTypeId : "EMAIL"
				}, {
					CommentTypeId : "OTHER"
				} ];

				oModel.setProperty("/CommentsTypes", aCommTypes);

				var oSelLabel = new Label({
					text : "{i18nCom>fillCommType}"
				});

				var oSelect = new Select({
					forceSelection : false,
					selectedKey : {
						parts : [ {
							path : "ui>CommentTypeId"
						}, {
							path : "i18nCom>commIdCall"
						}, {
							path : "i18nCom>commIdNote"
						}, {
							path : "i18nCom>commIdEmail"
						}, {
							path : "i18nCom>commIdOther"
						} ],
						formatter : function(sCommId, sCommCall, sCommNote,
								sCommEmail, sCommOther) {
							return oFormatterCom.getCommentType(sCommId,
									sCommCall, sCommNote, sCommEmail,
									sCommOther);
						}
					},
					change : function(oEvent) {
						that._onCommTypeChange(oEvent, that)
					},
				}).bindAggregation("items", "ui>/CommentsTypes", new Item({
					key : "{ui>CommentTypeId}",
					text : {
						parts : [ {
							path : "ui>CommentTypeId"
						}, {
							path : "i18nCom>commIdCall"
						}, {
							path : "i18nCom>commIdNote"
						}, {
							path : "i18nCom>commIdEmail"
						}, {
							path : "i18nCom>commIdOther"
						} ],
						formatter : function(sCommId, sCommCall, sCommNote,
								sCommEmail, sCommOther) {
							return oFormatterCom.getCommentType(sCommId,
									sCommCall, sCommNote, sCommEmail,
									sCommOther);
						}
					},

				}));
				var oTextLabel = new Label({
					text : "{i18nCom>commText}"
				});

				var oTextArea = new TextArea({
					growing : true,
					growingMaxLines : 5,
					value : "",
					editable : true,
					liveChange : function(oEvent) {
						that._onCommTextChange(oEvent, that)
					}
				});

				var oForm = new sap.ui.layout.form.SimpleForm({
					layout : "ResponsiveGridLayout",
					maxContainerCols : 2,
					content : [ oSelLabel, oSelect, oTextLabel, oTextArea ]
				});

				var oDialog = new Dialog({
					title : "{i18nCom>addCommentTitle}",
					contentWidth : "500px",
					contentHeight : "300px",
					resizable : true,
					content : [ oForm ],
					beginButton : new Button({
						text : "{i18nCom>save}",
						type : "Emphasized",
						press : function(oEvent) {
							var that = this.getParent().getParent();
							that._onCommentSave(oEvent);
							oDialog.close();
						}
					}),
					endButton : new Button({
						text : "{i18nCom>cancel}",
						press : function() {
							oDialog.close();
						}
					}),

				}).addStyleClass("sapUiPopupWithPadding");

				// to get access to the global model
				that.addDependent(oDialog);

				oDialog.open();
			}
		},

		_onCommentSave : function(oEvent) {
			var sCommTypeId = this.sCommentTypeId;
			var oResBundleModel = this.getModel("i18nCom");
			// check comment type is filled
			if (!sCommTypeId) {
				var message = oResBundleModel.getResourceBundle().getText(
						"fillCommType");
				MessageToast.show(message);
			} else {
				var context = this.getBindingContext("ui");
				var sPath = context.getPath();
				var oModel = this.getModel("ui");
				var oRequisition = oModel.getProperty(sPath);
				// delete skills from requisition
				var ReqId = oModel.getProperty(sPath).ReqId;
				
				if (!ReqId || ReqId == ""){
					var message = oResBundleModel.getResourceBundle().getText(
					"choseReq");
					MessageToast.show(message);
				}
				else{
				var sCommTitle;
				switch (sCommTypeId) {
				case "CALL":
					sCommTitle = oResBundleModel.getResourceBundle().getText(
							"commCall");
					break;
				case "NOTE":
					sCommTitle = oResBundleModel.getResourceBundle().getText(
							"commNote");
					break;
				case "OTHER":
					sCommTitle = "";
					break;
				case "EMAIL":
					sCommTitle = oResBundleModel.getResourceBundle().getText(
							"commEmail");
					break;
				}

				var oNewComment = {
					ReqId : ReqId,
					CommentId : "",
					CommentTypeId : this.sCommentTypeId,
					CommCreatedAt : "",
					CommCreatedBy : "",
					CommTitle : sCommTitle,
					Text : this.sCommText,
					CommentStatusId : "I",
					flag : "I"
				}

				// prepare requisition for update
				var sMode = oModel.getProperty("/Mode");
				if (sMode != "C" && sMode != "U") {
					oRequisition.skills = [];
				}
				var aComments = [];
				aComments.push(oNewComment);
				oRequisition.comments = aComments;
				var that = this;
				// update Requisition
				DataHelper.updateRequisitions(
						Mapper.composeRequisitionForUpdate(oRequisition)).then(
						function(oData) {
							that._checkSaveError(oData, that, sPath, oModel,
									ReqId)
						});
			}
			}
		},

		_onCommTypeChange : function(oEvent, that) {
			that.sCommentTypeId = oEvent.oSource.getSelectedKey();
		},

		_onCommTextChange : function(oEvent, that) {
			that.sCommText = oEvent.oSource.getValue();
		},
		_checkSaveError : function(oData, that, sPath, oModel, ReqId) {
			var aErrors = oData.ERRORS;

			var isSuccess = false;
			if (aErrors.length === 0) {
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
				this._loadRequisition(ReqId, sPath);
			} else {
				var oResBundleModel = that.getModel("i18nCom");
				var message = oResBundleModel.getResourceBundle().getText(
						"saveError");
				MessageToast.show(message);
			}
		},

		_loadRequisition : function(ReqId, sPath) {
			var oModel = this.getModel("ui");
			DataHelper.getRequisition(ReqId).then(
					function(oData) {
						var oRequisition = oModel.getProperty(sPath);
						oModel.setProperty(sPath, jQuery
								.extend(true, oRequisition, Mapper
										.mapRequisition(oData.data)));
					});
		},

		renderer : {}
	});
});