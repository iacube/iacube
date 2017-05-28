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
			oEventBus.subscribe("DetailVacancy", "RequisSave",
					this.loadRequisitions, this);
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
			var query = oEvent.getParameter("query");
			this._doSearch(query);
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
			this._createNewRequis();
		},

		_createNewRequis : function(oEvent) {
			// create new requisition entity
			var oModel = this.getModel("ui");
			var oRequisitions = oModel.getProperty("/JobRequisCollection");

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
				Language : "",
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

			oRequisitions.push(oNewRequisition);
			oModel.setProperty("/JobRequisCollection", oRequisitions);

			// get new requisition index
			var index = oRequisitions.length - 1;
			this._setNewSelection(index);
			// set property editable
			oModel.setProperty("/RequisEditable", true);
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
		}

	});

});