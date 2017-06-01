sap.ui.define([
	"sap/m/VBox",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/TextArea",
	"sap/m/Input",
	"sap/ui/core/Item",
	"sap/m/ComboBox",
	"iacube/ui/common/formatterCom",
	"sap/ui/model/json/JSONModel"
], function(VBox, SimpleForm, Label, TextArea, Input, Item, ComboBox, oFormatterCom, JSONModel) {
	"use strict";

	return VBox.extend("iacube.ui.common.InfoForm", {
		
		init: function() {
			VBox.prototype.init.apply(this, arguments);
			this._bInitialized = false;
		},
		
		onBeforeRendering: function() {
			if(!this._bInitialized){
				var oModel = this.getModel("ui");
				oModel.setProperty("/RequisEditable", false)
				this.createSimpleFormContent();
				this._bInitialized = true;
			}
		},	

		createSimpleFormContent: function() {
			var oForm = new SimpleForm("infoForm", {
				minWidth: 1024,
				maxContainerCols: 2,
				editable: true,
				layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				labelSpanL: 3,
				labelSpanM: 3,
				emptySpanL: 3,
				emptySpanM: 3,
				columnsL: 2,
				columnsM: 2,

				content: [
					new Label({
						text: "{i18nCom>requisName}",
						labelFor: "idPos",
						required: "{ui>/RequisEditable}"
					}),
					new Input("idPos", {
						value: "{ui>Title}",
						editable: "{ui>/RequisEditable}"
					}),

					new Label({
						text: "{i18nCom>Project}",
						labelFor: "idProj",
						required: "{ui>/RequisEditable}"
					}),
					new Input("idProj", {
						value: "{ui>ProjectId}",
						editable: "{ui>/RequisEditable}"
					}),
						
					new Label({
						text: "{i18nCom>priority}",
						labelFor: "idPrior",
						required: "{ui>/RequisEditable}"
					}),
					
					new ComboBox("idPrior", {
						selectedKey: "{ui>PriorityId}",
						editable: "{ui>/RequisEditable}"
					}).bindAggregation("items", "ui>/AvailablePriorities", new Item({
							key: "{ui>PriorityCode}",
							text: { parts: [{path: 'ui>PriorityCode'},
							                {path: 'i18nCom>priorL'},
							                {path: 'i18nCom>priorMA'},
							                {path: 'i18nCom>priorMI'},
							                {path: 'i18nCom>priorH'},
							                {path: 'i18nCom>priorN'},
							                {path: 'i18nCom>priorVH'}],
									formatter: function(sPriorCode, sPriorL, sPriorMA, sPriorMI, sPriorH, sPriorN, sPriorVH) {
										return oFormatterCom.getPriorDescr(sPriorCode, sPriorL, sPriorMA, sPriorMI, sPriorH, sPriorN, sPriorVH);
								}}
				
						})),
					
					new Label({
						text: "{i18nCom>location}",
						labelFor: "idLocation",
						required: "{ui>/RequisEditable}"
					}),
					new Input("idLocation", {
						value: "{ui>Location}",
						editable: "{ui>/RequisEditable}"
					}),

					new Label({
						text: "{i18nCom>language}",
						labelFor: "idLangu"
					}),
						
					new Label({
						text: "{i18nCom>keyWords}",
						labelFor: "idKeyW"
					}),
					new TextArea("idKeyW", {
						growing: true,
						growingMaxLines: 5,
						value: "{ui>Keywords}",
						editable: "{ui>/RequisEditable}"
					}),
					new Label({
						text: "{i18nCom>descr}",
						labelFor: "idDescr"
					}),
					new TextArea("idDescr", {
						value: "{ui>Description}",
						editable: "{ui>/RequisEditable}",
						rows: 7
					})
				]
			});
		

			this.addItem(oForm);
		},
		
		

		renderer: {}
	});
});