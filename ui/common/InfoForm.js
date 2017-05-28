sap.ui.define([
	"sap/m/VBox",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/TextArea",
	"sap/m/Input",
	"sap/ui/core/Item",
	"sap/m/ComboBox",
	"iacube/ui/common/formatterCom"
], function(VBox, SimpleForm, Label, TextArea, Input, Item, ComboBox, oFormatterCom) {
	"use strict";

	return VBox.extend("iacube.ui.common.InfoForm", {
		
		metadata : {			
			properties :
			{				
				formEditable : {type : "boolean", group : "data", defaultValue : false}
			}			
		},
		
		init: function() {
			VBox.prototype.init.apply(this, arguments);
			this.createSimpleFormContent();
		},

		createSimpleFormContent: function() {
			var bEditable = this.getFormEditable();
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
						required: bEditable
					}),
					new Input("idPos", {
						value: "{ui>Title}",
						editable: bEditable
					}),

					new Label({
						text: "{i18nCom>Project}",
						labelFor: "idProj",
						required: bEditable
					}),
					new Input("idProj", {
						value: "{ui>ProjectId}",
						showSuggestion: true,
						showValueHelp: true,
						editable: bEditable,
						events: [{
							valueHelpRequest: "this._handleProjValueHelp"
						}]
					}).bindAggregation("suggestionItems", "ui>/JobRequisCollection",
						new Item({
							text: "{ui>ProjectId}"
						})),
						
					new Label({
						text: "{i18nCom>priority}",
						labelFor: "idPrior",
						required: bEditable
					}),
					
					new ComboBox("idPrior", {
						selectedKey: "{ui>PriorityId}",
						editable: bEditable
					}).bindAggregation("items", "ui>/AvailablePriorities", new Item({
							key: "{ui>PriorityCode}",
							text: { parts: [{path: 'ui>PriorityCode'},
							                {path: 'i18nCom>priorLow'},
							                {path: 'i18nCom>priorMedium'},
							                {path: 'i18nCom>priorHigh'}],
									formatter: function(sPriorCode, sProirLow, sPriorMedium, sPriorHigh) {
										return oFormatterCom.getPriorDescr(sPriorCode, sProirLow, sPriorMedium, sPriorHigh);
								}}
									
									
						})),
					
					new Label({
						text: "{i18nCom>location}",
						labelFor: "idLocation",
						required: bEditable
					}),
					new Input("idLocation", {
						value: "{ui>Location}",
						editable: bEditable
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
						editable: bEditable
					}),
					new Label({
						text: "{i18nCom>descr}",
						labelFor: "idDescr"
					}),
					new TextArea("idDescr", {
						value: "{ui>Description}",
						editable: bEditable,
						rows: 7
					})
				]
			});

			this.addItem(oForm);
		},

		renderer: {}
	});
});