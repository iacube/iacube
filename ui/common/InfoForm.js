sap.ui.define([
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/Text"
], function(SimpleForm, Label, Text) {
	"use strict";

	var InfoForm = SimpleForm.extend("iacube.ui.common.InfoForm", {
		metadata: {
			properties: {
				minWidth: "1024",
				maxContainerCols: "2",
				editable: "false",
				layout: "sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout",
				labelSpanL: "3",
				labelSpanM: "3",
				emptySpanL: "3",
				emptySpanM: "3",
				columnsL: "2",
				columnsM: "2"
				}
		},
		renderer: ""
	});

	InfoForm.prototype.init = function(oEvent) {
		SimpleForm.prototype.init.apply(this, arguments);
		// this.createSimpleFormContent();
	};

	InfoForm.prototype.createSimpleFormContent = function() {

		// this.oContent = [
		// 	new sap.m.Label({text:"Name"})
		// 	// new Label({
		// 	// 	text: "{i18n>requisName}"
		// 	// }),
		// 	// new Text({
		// 	// 	text: "{requis>Position}"
		// 	// }),
		// 	// new Label({
		// 	// 	text: "{i18n>location}"
		// 	// }),
		// 	// new Text({
		// 	// 	text: "{requis>Location}"
		// 	// }),
		// 	// new Label({
		// 	// 	text: "{i18n>language}"
		// 	// }),
		// 	// new Text({
		// 	// 	text: ""
		// 	// }),
		// 	// new Label({
		// 	// 	text: "{i18n>keyWords}"
		// 	// }),
		// 	// new Text({
		// 	// 	text: ""
		// 	// }),
		// 	// new Label({
		// 	// 	text: "{i18n>descr}"
		// 	// }),
		// 	// new Text({
		// 	// 	text: "{requis>Description}"
		// 	// })
		// ];
		var oLabel = new sap.m.Label({text:"Test"});
		this.addContent(oLabel);
		var content = this.getContent();
	};
	
	return InfoForm;
});