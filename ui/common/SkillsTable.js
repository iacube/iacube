sap.ui.define([
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/Text",
	"sap/m/Slider",
	"sap/m/ObjectNumber",
	"sap/m/ColumnListItem",
	"sap/m/Toolbar",
	"manage_vacancy/util/formatter"
], function(Table, Column, Text, Slider, ObjectNumber, ColumnListItem, oFormatter) {
	"use strict";

	return Table.extend("iacube.ui.common.SkillsTable", {
		
		init: function() {
			Table.prototype.init.apply(this, arguments);
			this.bindProperty("headerText", {parts: [
				 {path: "i18n>skills" },
                 {path: "requis>RequisSkillsCollection/length" }
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
						text: "{i18n>skillName}"
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
						text: "{i18n>weight} %"
					})
				]
			});
			
			this.addAggregation("columns", oColSkillName, true);
			this.addAggregation("columns", oColSlider, true);
			this.addAggregation("columns", oColWeight, true);
		},
		
		_bindTable: function() {
			var oText = new Text({
				text: "{requis>Skill}"
			});
			
			var oSlider = new Slider({
				min: 0,
				max: 100,
				value: "{requis>Weight}",
				enabled: false
			});
			
			oSlider.addStyleClass("sapUiSizeCompact");
			
			var oPercentage = new ObjectNumber({
				number: "{requis>Weight}",
				unit: "%"
			});
			
			this.oTemplate	= new ColumnListItem({
			cells: [
				oText, 
				oSlider,
				oPercentage
			]
		});
		
			this.bindAggregation("items", "requis>RequisSkillsCollection", this.oTemplate);
		},

		renderer: "sap.m.TableRenderer"
	});
});