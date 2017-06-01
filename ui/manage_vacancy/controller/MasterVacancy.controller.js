sap.ui.define([ "manage_vacancy/controller/BaseController",
		"manage_vacancy/util/formatter", "iacube/ui/common/dataHelper",
		"iacube/ui/common/mapper" ], function(BaseController, formatter,
		DataHelper, Mapper) {
	"use strict";

	return BaseController.extend("manage_vacancy.controller.MasterVacancy", {

		onInit : function() {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("DetailVacancy", "RequisCancel",
					this.onRequisCancel, this);
			oEventBus.subscribe("DetailVacancy", "RequisCopy",
					this.onRequisCopy, this);
		},

		onAfterRendering : function() {
			this.loadRequisitions();
		},

		loadRequisitions : function() {
			var oModel = this.getModel("ui");
			DataHelper.getRequisitions(this).then(
					function(aRequisitions) {
						oModel.setProperty("/JobRequisCollection", Mapper
								.mapRequisitions(aRequisitions.data));		
					});
		},

		onReqSelected : function(oEvent) {
			// reset additional properties in case selection was changed
			var oModel = this.getModel("ui");
			oModel.setProperty("/RequisEditable", false);
			oModel.setProperty("/RequisReadOnly", true);
			oModel.setProperty("/TableMode", sap.m.ListMode.None);
			var oListItem = oEvent.getParameter("listItem");
			if (!oListItem) {
				var context = oEvent.getParameters().getBindingContext("ui");
			} else {
				context = oListItem.getBindingContext("ui");
			}
			var selPath = context.getPath();
			this.getRouter().navTo("detail", {
				from : "master",
				index : selPath.substr(("/JobRequisCollection/").length)
			}, false);
		},

		// Requisition search
		onRequisSearch : function(oEvent) {
			var newValue = oEvent.getParameter("newValue");
			this._doSearch(newValue);
		},

		_doSearch : function(val) {
			var filters = [];
			var filter = new sap.ui.model.Filter("Title",
					sap.ui.model.FilterOperator.Contains, val);
			filters.push(filter);
			var list = this.getView().byId("reqlist");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},

		onRequisCreate : function(oEvent) {
			var oModel = this.getModel("ui");
			oModel.setProperty("/Mode", "C");
			this._createNewRequis();
		},

		_createNewRequis : function(isCopy, oRequisition) {
			// create new requisition entity
			var oModel = this.getModel("ui");
			oModel.setProperty("/MessagePageVisible", false)
			oModel.setProperty("/CandidatesVisible", false)
			var oRequisitions = oModel.getProperty("/JobRequisCollection");
			
			if (isCopy && oRequisition) {
				var oNewRequisition = oRequisition;
				oNewRequisition.ReqId = "";
				oNewRequisition.StatusCodeId = "NEW";
				oNewRequisition.Title = oRequisition.Title + this.getResourceBundle().getText("copyTitle");
				oNewRequisition.comments = [];
				if (!oNewRequisition.Language || oNewRequisition.Language == ""){
					oNewRequisition.Language = "RU"
				}
				var oNewComment = {
						CommentId : "",
						CommentTypeId : "OPEN",
						CommCreatedAt : "",
						CommCreatedBy : "",
						CommTitle : "",
						Text : ""
					}
				oNewRequisition.comments.push(oNewComment);
				oNewRequisition.candidates = [];
			}
			else {
	
				var oNewRequisition = {
					ReqId : "",
					Title : "",
					ProjectId : "",
					PriorityId : "",
					Location : "",
					StatusCodeId : "NEW",
					SubcategoryId : "",
					SubcategoryName : "",
					CreatedBy : "",
					CreatedAt : "",
					Language : "RU",
					Keywords : "",
					Description : "",
					skills : [ {
						Skill : "",
						Weight : 100
					} ],
					comments : [ {
						CommentId : "",
						CommentTypeId : "OPEN",
						CommCreatedAt : "",
						CommCreatedBy : "",
						CommTitle : "",
						Text : ""
					} ]
				};
			}

			oRequisitions.push(oNewRequisition);
			oModel.setProperty("/JobRequisCollection", oRequisitions);

			// get new requisition index
			var index = oRequisitions.length - 1;
			this._setNewSelection(index);
			// set property editable
			oModel.setProperty("/RequisEditable", true);
			oModel.setProperty("/RequisReadOnly", false);
			oModel.setProperty("/TableMode", sap.m.ListMode.Delete);
			this.getRouter().navTo("detail", {
				from : "master",
				index : index
			}, false);
		},

		onRequisCancel : function(sView, oEvent, sIndex) {
			var index = sIndex
			if (sIndex != 0) {
				this._setNewSelection(sIndex - 1);
			} else {
				this._setNewSelection(sIndex - 1);
			}
		},

		_setNewSelection : function(sIndex) {
			var oList = this.getView().byId("reqlist");
			var oNewItem = oList.getItems()[sIndex];
			oList.setSelectedItem(oNewItem, true);
			oList.fireSelectionChange(oNewItem, true);
		},
		
		onRequisCopy: function(sView, oEvent, oRequisition) { //borrowed from Details
			this.getModel("ui").setProperty("/Mode", "C");
			this._createNewRequis(true, oRequisition); //isCopy = true
		}

	});

});