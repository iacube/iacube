sap.ui.define([
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/Text"
], function(SimpleForm, Label, Text) {
	"use strict";

	var InfoForm = SimpleForm.extend("manage_vacancy.common.InfoForm", {
		metadata: {
			// properties: {
			// 	minWidth: "1024",
			// 	maxContainerCols: "2",
			// 	editable: "false",
			// 	layout: "ResponsiveGridLayout",
			// 	labelSpanL: "3",
			// 	labelSpanM: "3",
			// 	emptySpanL: "3",
			// 	emptySpanM: "3",
			// 	columnsL: "2",
			// 	columnsM: "2"
			// }
		},
		renderer: {}
	});

	InfoForm.prototype.init = function(oEvent) {
		sap.ui.layout.form.SimpleForm.prototype.init.apply(this, arguments);
		this.createSimpleFormContent();
	};

	InfoForm.prototype.createSimpleFormContent = function() {
		this.oContent = [
			new Label({
				text: "{i18n>requisName}"
			}),
			new Text({
				text: "{requis>Position}"
			}),
			new Label({
				text: "{i18n>location}"
			}),
			new Text({
				text: "{requis>Location}"
			}),
			new Label({
				text: "{i18n>language}"
			}),
			new Text({
				text: ""
			}),
			new Label({
				text: "{i18n>keyWords}"
			}),
			new Text({
				text: ""
			}),
			new Label({
				text: "{i18n>descr}"
			}),
			new Text({
				text: "{requis>Description}"
			})
		];
		this.addContent(this.oContent);
	};
});