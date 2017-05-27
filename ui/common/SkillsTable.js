sap.ui.define([
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/Text",
	"sap/m/Slider",
	"sap/m/ObjectNumber",
	"sap/m/ColumnListItem",
	"sap/m/Input",
	"sap/m/Toolbar",
	"sap/m/Button",
	"sap/m/Title",
	"sap/m/ToolbarSpacer"
], function(Table, Column, Text, Slider, ObjectNumber, ColumnListItem, Input, Toolbar, Button, Title, ToolbarSpacer) {
	"use strict";

	return Table.extend("iacube.ui.common.SkillsTable", {
		
		init: function() {
			Table.prototype.init.apply(this, arguments);
			this._bInitialized = false;
		},
		
		onBeforeRendering: function(){
			Table.prototype.onBeforeRendering.apply(this, arguments);
			if(!this._bInitialized){
				var oModel = this.getModel("ui");
				oModel.setProperty("/RequisEditable", false)
				this.bindProperty("mode", "ui>/TableMode");
				this.attachDelete(this._onSkillDelete);
				this._createToolbar();
				this._createColumns();
				this._bindTable();
				this._bInitialized = true;
			}
		},
		
		_createToolbar: function(){
			var oToolbar = new Toolbar();
			var oTitle = new Title({
				text: {parts: [
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
				}
			});
			var oSpacer = new ToolbarSpacer({	
				width: "90%"
			});
			var oButtonAdd = new Button({
				icon: "sap-icon://add",
				visible: "{ui>/RequisEditable}",
				press: this._onSkillCreate
			});
			
			oToolbar.addAggregation("content", oTitle, true);	
			oToolbar.addAggregation("content", oSpacer, true);
			oToolbar.addAggregation("content", oButtonAdd, true);
			this.setHeaderToolbar(oToolbar);
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
		
		_onSkillDelete: function(oEvent) {
			// delete skill
			var path = oEvent.getParameter("listItem").getBindingContext("ui").getPath();
            var index = parseInt(path.substring(path.lastIndexOf('/') +1));
            var dataPath = path.substring(0, path.lastIndexOf('/'));
            var oModel = this.getModel("ui");
            var skills = oModel.getProperty(dataPath);
            skills.splice(index, 1);
            oModel.setData(skills, true);
		},
		
		_onSkillCreate: function(oEvent) {
			// add new skill 
			var oTable = this.getParent().getParent();
			var path = oTable.getBindingContext("ui").getPath();
			var oModel = oTable.getModel("ui");
			var skills = oModel.getProperty(path).skills;
			
			var oNewSkill = {
					Skill: "",
					Weight: 100
			}
			
			skills.push(oNewSkill);
			oModel.setData(skills, true);
		},

		renderer: "sap.m.TableRenderer"
	});
});