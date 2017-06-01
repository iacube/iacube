sap.ui.define([
	"sap/m/Table",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/TextArea",
	"sap/m/Text",
	"sap/m/Link",
	"sap/ui/core/Item",
	"sap/m/ComboBox",
	"iacube/ui/common/formatterCom"
], function(Table, SimpleForm, Label, TextArea, Text, Link, Item, ComboBox, oFormatterCom) {
	"use strict";

	return Table.extend("iacube.ui.common.candExperienceTable", {
		
		metadata : {			
			properties :
			{				
				experience		: {type : "object[]", group: "data"}				
			}			
		},
		renderer : "sap.m.TableRenderer",
		_bInitialized : false,
		
		init: function() {
			Table.prototype.init.apply(this, arguments);
			this.oLocalModel = new sap.ui.model.json.JSONModel();
			this.setModel(this.oLocalModel, "local");
		},
			
		onBeforeRendering: function(){
			Table.prototype.onBeforeRendering.apply(this, arguments);
			
			this.oLocalModel.setProperty("/experience",	this.getExperience());
			
			if(!this._bInitialized) {
				this.oBundle = this.getModel("i18nCom").getResourceBundle();				
				this._createColumns();
				this._bindTable();	
				
				this._bInitialized = true;
			}
		},
		
		_createColumns: function() {

			this.addColumn(new sap.m.Column({
				width: "15%",
				header	: [
					new sap.m.Text({
						text	: this.oBundle.getText("cand.experience.table.company"),
						hAlign	: "Center"
					})
				]
				})
			).addColumn(new sap.m.Column({
				width: "15%",
				header	: [
					new sap.m.Text({ text : this.oBundle.getText("cand.experience.table.position")})
				]
			})).addColumn(new sap.m.Column({
				width: "8%",
				header	: [
					new sap.m.Text({ text : this.oBundle.getText("cand.experience.table.startdate")})
				]
			})).addColumn(new sap.m.Column({
				width: "8%",
				header	: [
					new sap.m.Text({ text : this.oBundle.getText("cand.experience.table.enddate")})
				]
			})).addColumn(new sap.m.Column({
				header	: [
					new sap.m.Text({ text : this.oBundle.getText("cand.experience.table.description")})
				]
			}));			
		},
		
		_bindTable: function() {

			var oTemplate = new sap.m.ColumnListItem({
				vAlign: "Top",
				cells: [
					new sap.m.Link({
						text	: "{local>Company}",
						design 	: "Bold"
					}),
					new Text({text:"{local>Position}"}),
					new Text({text: {model:"local", path:"StartDate", type: "sap.ui.model.type.DateTime", formatOptions: {pattern:"MM/yyyy"} }}),
					new Text({text: {model:"local", path:"EndDate", type: "sap.ui.model.type.DateTime", formatOptions: {pattern:"MM/yyyy"} }}),
					new Text({text:"{local>Description}"})
				]
			});			
			
			this.bindAggregation("items", "local>/experience", oTemplate);
			
		},
		
	});
});