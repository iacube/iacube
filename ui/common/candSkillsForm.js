sap.ui.define([
	"sap/m/VBox",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/TextArea",
	"sap/m/Input",
	"sap/m/Link",
	"sap/ui/core/Item",
	"sap/m/ComboBox",
	"iacube/ui/common/formatterCom"
], function(VBox, SimpleForm, Label, TextArea, Input, Link, Item, ComboBox, oFormatterCom) {
	"use strict";

	return VBox.extend("iacube.ui.common.candSkillsForm", {
		
		metadata : {			
			properties :
			{				
				skills		: {type : "object[]", group: "data"}				
			}			
		},
		
		init: function() {
			VBox.prototype.init.apply(this, arguments);
			this.oLocalModel = new sap.ui.model.json.JSONModel();
			this.setModel(this.oLocalModel, "local");
			this.createSimpleFormContent();
		},
		
		onBeforeRendering: function(){
			this.oLocalModel.setProperty("/skills",	this.getSkills());
		},

		createSimpleFormContent: function() {
			
			this.oTemplate = new Input({
				value: "{local>Skill}",
				editable: false
			});
			
			var oForm = new SimpleForm("candSkillsForm", {
				minWidth: 1024,
				maxContainerCols: 2,
				editable: false,
				layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				labelSpanL: 3,
				labelSpanM: 3,
				emptySpanL: 3,
				emptySpanM: 3,
				columnsL: 2,
				columnsM: 2,

				content: [
					// Имя
					new Label({
						text: "{i18nCom>cand.skillsform.name}",
						labelFor: "cand_info_skiss"
					}),
					new VBox("cand_info_skiss",{
						getFitContainer: true
					}).bindAggregation("items", "local>/skills", this.oTemplate)
		
				]
			});

			this.addItem(oForm);
		},

		renderer: {}
	});
});