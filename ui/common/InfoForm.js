sap.ui.define([
	"sap/m/VBox",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/TextArea",
	"sap/m/Input",
	"sap/ui/core/Item",
	"sap/m/ComboBox",
	"manage_vacancy/util/formatter"
], function(VBox, SimpleForm, Label, TextArea, Input, Item, ComboBox, oFormatter) {
	"use strict";

	return VBox.extend("iacube.ui.common.InfoForm", {

		init: function() {
			VBox.prototype.init.apply(this, arguments);
			this.createSimpleFormContent();
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
						text: "{i18n>requisName}",
						labelFor: "idPos"
					}),
					new Input("idPos", {
						value: "{requis>Position}"
					}).setEditable(false),

					new Label({
						text: "{i18n>Project}",
						labelFor: "idProj"
					}),
					new Input("idProj", {
						value: "{requis>Project}",
						showSuggestion: true,
						showValueHelp: true,
						events: [{
							valueHelpRequest: "this._handleProjValueHelp"
						}]
					}).setEditable(false).bindAggregation("suggestionItems", "requis>/JobRequisCollection",
						new Item({
							text: "{requis>Project}"
						})),
						
					new Label({
						text: "{i18n>priority}",
						labelFor: "idPrior"
					}),
					
					new ComboBox("idPrior", {
						selectedKey: "{requis>Priority}"
						// selectedKey: { path: "requis>Priority",
						// 			   formatter: function(sPriority) {
						// 			   	 return	oFormatter.getPriorityDescr(sPriority);
						// 			   }
						// }
					}).bindAggregation("items", "requis>/AvailablePriorities", new Item({
							key: "{requis>PriorityCode}",
							text: "{requis>PriorityCode}"
						})).setEditable(false),
					
					// new Label({
					// 	text: "{i18n>priority}",
					// 	labelFor: "idTest"
					// }),
						
					// new Text("idTest", {
					// 	text: {
					// 		path: "requis>Priority",
					// 		formatter: function(prior) { 
					// 			return oFormatter.getPriorityDescr(prior);
					// 		}
					// 	}
					// }),

					new Label({
						text: "{i18n>location}",
						labelFor: "idLocation"
					}),
					new Input("idLocation", {
						value: "{requis>Location}"
					}).setEditable(false),

					new Label({
						text: "{i18n>language}",
						labelFor: "idLangu"
					}),
					new ComboBox("idLangu", {
						selectedKey: "{requis>Language}"
					}).bindAggregation("items", "requis>/AvailableLanguages", new Item({
							key: "{requis>SlsLang}",
							text: "{requis>SlsLang}"
						})).setEditable(false),
						
					new Label({
						text: "{i18n>keyWords}",
						labelFor: "idKeyW"
					}),
					new TextArea("idKeyW", {
						growing: true,
						growingMaxLines: 5,
						value: ""
					}).setEditable(false),
					new Label({
						text: "{i18n>descr}",
						labelFor: "idDescr"
					}),
					new TextArea("idDescr", {
						value: "{requis>Description}",
						rows: 7
					}).setEditable(false)
				]
			});

			this.addItem(oForm);
		},

		renderer: {}
	});
});