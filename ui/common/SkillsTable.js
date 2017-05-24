sap.ui.define([
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/Text",
	"sap/m/Slider",
	"sap/m/ObjectNumber",
	"sap/m/ColumnListItem",
	"sap/m/Input"
], function(Table, Column, Text, Slider, ObjectNumber, ColumnListItem, Input) {
	"use strict";

	return Table.extend("iacube.ui.common.SkillsTable", {
		
		init: function() {
			Table.prototype.init.apply(this, arguments);
			this.bindProperty("headerText", {parts: [
				 {path: "i18nCom>skills" },
                 {path: "ui>skills/length" }
				],
				formatter: function(sName,sCount) {
					if(sCount){
						return sName + " (" + sCount + ")";}
					else{
						return sName + " (" + ")";
					}
				}
			});
			this.bindProperty("mode", "ui>/TableMode");
			this._createColumns();
			this._bindTable();
		},
		
		_createColumns: function() {
			var oColSkillName = new Column({
				hAlign: "Left",
				header: [
					new Text({
						text: "{i18nCom>skillName}"
					})
				]
			});
			
			var oColSlider = new Column({
				hAlign: "Right"
			});
			
			var oColWeight = new Column({
				hAlign: "Left",
				header: [
					new Text({
						text: "{i18nCom>weight} %"
					})
				]
			});
			
			this.addAggregation("columns", oColSkillName, true);
			this.addAggregation("columns", oColSlider, true);
			this.addAggregation("columns", oColWeight, true);
		},
		
		_bindTable: function() {
			var oInput = new Input({
				value: "{ui>Skill}",
				editable: "{ui>/RequisEditable}"
			});
			
			var oSlider = new Slider({
				min: 0,
				max: 100,
				value: "{ui>Weight}",
				enabled: "{ui>/RequisEditable}"
			});
			
			oSlider.addStyleClass("sapUiSizeCompact");
			
			var oPercentage = new ObjectNumber({
				number: "{ui>Weight}",
				unit: "%"
			});
			
			this.oTemplate	= new ColumnListItem({
			vAlign: "Middle",
			cells: [
				oInput, 
				oSlider,
				oPercentage
			]
		});
		
			this.bindAggregation("items", "ui>skills", this.oTemplate);
		},

		renderer: "sap.m.TableRenderer"
	});
});