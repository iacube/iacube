sap.ui.define([
	"manage_vacancy/controller/BaseController",
	"manage_vacancy/util/formatter",
	"iacube/ui/common/dataHelper",
	"iacube/ui/common/mapper"
], function(BaseController, formatter, DataHelper, Mapper) {
	"use strict";

	return BaseController.extend("manage_vacancy.controller.MasterVacancy", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
			 onInit: function() {
				 var oEventBus = sap.ui.getCore().getEventBus();
				 oEventBus.subscribe("DetailVacancy", "RequisCancel", this.onRequisCancel, this);
			 },

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
		onAfterRendering: function() {
			this.loadRequisitions();
		},
		
		loadRequisitions: function(){
			var oModel = this.getModel("ui");
			DataHelper.getRequisitions(this).then(function(aRequisitions){
				oModel.setProperty("/JobRequisCollection", Mapper.mapRequisitions(aRequisitions.data));
			});
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf vacancymngt.view.MasterVacancy
		 */
		//	onExit: function() {
		//
		//	}
		onReqSelected: function(oEvent){
// reset additional properties in case selection was changed
			var oModel = this.getModel("ui");
			oModel.setProperty("/RequisEditable", false);
			oModel.setProperty("/TableMode", sap.m.ListMode.None);
			var oListItem = oEvent.getParameter("listItem");
			if(!oListItem){
				var context = oEvent.getParameters().getBindingContext("ui");
			}
			else {
				context = oListItem.getBindingContext("ui");
			}
			var selPath = context.getPath();
			this.getRouter().navTo("detail", {from: "master", index: selPath.substr(("/JobRequisCollection/").length)}, false);
		},
		
		//Requisition search
		onRequisSearch: function(oEvent) {
			var query = oEvent.getParameter("query");
			this._doSearch(query);
		},
		
		_doSearch: function(val) {
			var filters = [];
			var filter = new sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.Contains, val);
			filters.push(filter);
			var list = this.getView().byId("reqlist");
			var binding = list.getBinding("items");
			binding.filter(filters);
			},
		
		onRequisCreate: function(oEvent) {
			this._createNewRequis();
		},
		
		_createNewRequis: function(oEvent) {
// create new requisition entity
			var oModel = this.getModel("ui");
			var oRequisitions = oModel.getProperty("/JobRequisCollection");
			
			var oNewRequisition = {
					ReqId: "0000",
					Title: "",
					ProjectId: "",
					PriorityId: "",
					Location: "",
					StatusCodeId: "NEW",
					SubcategoryId: "",
					SubcategoryName: "",
					CreatedBy: "",
					CreatedAt: "",
					Language: "",
					Keywords: "",
					Description: "",
					skills: [{
							Skill: "",
							Weight: 100
						}],
					comments: [{
						CommentId: "",
						CommentTypeId: "OPEN",
						CommCreatedAt: "",
						CommCreatedBy: "",
						CommTitle: "",
						Text: ""
					}]
					};
			
			oRequisitions.push(oNewRequisition);
			oModel.setProperty("/JobRequisCollection", oRequisitions);
			
			// get new requisition index
			var index = oRequisitions.length - 1;
			this._setNewSelection(index);
			// set property editable
			oModel.setProperty("/RequisEditable", true);
			oModel.setProperty("/TableMode", sap.m.ListMode.Delete);
			this.getRouter().navTo("detail", {from: "master", index: index}, false);
			},
			
		 onRequisCancel: function(sView, oEvent, sIndex) {
			 var index = sIndex
			 if(sIndex != 0) {
				this._setNewSelection(sIndex-1);
			 }
			 else {
				this._setNewSelection(sIndex-1);
			}
		 },
		 
		 _setNewSelection: function(sIndex) {
			 var oList = this.getView().byId("reqlist");
			 var oNewItem = oList.getItems()[sIndex];
			 oList.setSelectedItem(oNewItem, true);
			 oList.fireSelectionChange(oNewItem, true);
		 }
			
	});

});