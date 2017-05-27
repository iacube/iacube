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

	return VBox.extend("iacube.ui.common.candInfoForm", {
		
		metadata : {			
			properties :
			{				
				FirstName	 : {type : "string", group : "data"},
				LastName	 : {type : "string", group : "data"},
				ProfArea 	 : {type : "string", group : "data"},
				Location 	 : {type : "string", group : "data"},
				Link 		 : {type : "string", group : "data"},				
				Summary 	 : {type : "string", group : "data"}			
				
			}			
		},
		
		init: function() {
			VBox.prototype.init.apply(this, arguments);
			this.oLocalModel = new sap.ui.model.json.JSONModel();
			this.setModel(this.oLocalModel, "local");
			this.createSimpleFormContent();
		},
		
		onBeforeRendering: function(){
			this.oLocalModel.setProperty("/FirstName",	this.getFirstName());
			this.oLocalModel.setProperty("/LastName",	this.getLastName());
			this.oLocalModel.setProperty("/ProfArea",	this.getProfArea());
			this.oLocalModel.setProperty("/Location",	this.getLocation());
			this.oLocalModel.setProperty("/Link",		this.getLink());
			this.oLocalModel.setProperty("/Summary",	this.getSummary());
		},

		createSimpleFormContent: function() {
			var oForm = new SimpleForm("candInfoForm", {
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
					// Имя
					new Label({
						text: "{i18nCom>cand.infoform.name}",
						labelFor: "cand_info_name"
					}),
					new Input("cand_info_name", {
						value: "{local>/FirstName} {local>/LastName}",
						editable: false
					}),
					
					//Индустрия
					new Label({
						text: "{i18nCom>cand.infoform.industry}",
						labelFor: "cand_info_ind"
					}),
					new Input("cand_info_ind", {
						value: "{local>/ProfArea}",
						editable: false
					}),
					
					//Местоположение
					new Label({
						text: "{i18nCom>cand.infoform.location}",
						labelFor: "cand_info_loc"
					}),
					new Input("cand_info_loc", {
						value: "{local>/Location}",
						editable: false
					}),
					
					//Сайт
					new Label({
						text: "{i18nCom>cand.infoform.website}",
						labelFor: "cand_info_site"
					}),
					new Input("cand_info_site", {
						value: "{local>/Link}",
						editable: false
					}),
					
					//Описание
					new Label({
						text: "{i18nCom>cand.infoform.description}",
						labelFor: "cand_info_descr"
					}),
					new Input("cand_info_descr", {
						value: "{local>/Summary}",
						editable: false
					})					
				]
			});

			this.addItem(oForm);
		},

		renderer: {}
	});
});