sap.ui.define([
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/Text",
	"sap/m/Slider",
	"sap/m/ObjectNumber",
	"sap/m/ColumnListItem",
	"sap/m/Toolbar"
], function(Table, Column, Text, Slider, ObjectNumber, ColumnListItem) {
	"use strict";

	return Table.extend("iacube.ui.common.SkillsTable", {
		
		init: function() {
			Table.prototype.init.apply(this, arguments);
			this.bindProperty("headerText", {parts: [
				 {path: "i18nCom>skills" },
                 {path: "ui>skills/length" }
				],
				formatter: function(sName,sCount) {
					return sName + " (" + sCount + ")";
				}
			});
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
			var oText = new Text({
				text: "{ui>Skill}"
			});
			
			var oSlider = new Slider({
				min: 0,
				max: 100,
				value: "{ui>Weight}",
				enabled: false
			});
			
			oSlider.addStyleClass("sapUiSizeCompact");
			
			var oPercentage = new ObjectNumber({
				number: "{ui>Weight}",
				unit: "%"
			});
			
			this.oTemplate	= new ColumnListItem({
			vAlign: "Middle",
			cells: [
				oText, 
				oSlider,
				oPercentage
			]
		});
		
			this.bindAggregation("items", "ui>skills", this.oTemplate);
		},

		renderer: "sap.m.TableRenderer"
	});
});