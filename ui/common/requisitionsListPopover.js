sap.ui.define([
	"sap/m/Popover",
	"sap/m/VBox",
	"sap/m/HBox",
	"sap/m/Image",
	"sap/m/Text",
	"sap/m/List",
	"sap/m/CustomListItem",
	"sap/m/Link",
], function(Popover, VBox, HBox, Image, Text, List, CustomListItem, Link) {
	"use strict";

	return Popover.extend("iacube.ui.common.requisitionsListPopover", {
		
		metadata : {			
			properties : {
				requisitions	 : {type : "object[]", group: "data"}
			}			
		},
		
		init: function() {
			Popover.prototype.init.apply(this, arguments);
			this.oLocalModel = new sap.ui.model.json.JSONModel();
			this.setModel(this.oLocalModel, "local");
			this.setPlacement("Left");
			
			this.attachAfterClose(function(){this.destroyContent()}.bind(this));
		},
		
		onBeforeRendering: function(){
			
			this.oBundle = this.getModel("i18nCom").getResourceBundle();
			this.setTitle(this.oBundle.getText("candidates.list.popover.title"));
			
			this.oLocalModel.setProperty("/requisitions", this.getRequisitions());//.filter(function(r){return r.StatusId === "ASSIGNED"}));			
			this.createPopoverContent();
		},
		
		createPopoverContent: function() {	
			var oVBox = new VBox({
			}).bindAggregation("items", "local>/requisitions",
				new HBox({
					justifyContent: "SpaceBetween",
					items: [
						new Link({text:"{local>Title}", target:"{local>Link}",
							press: function(oEvent){						
								var sUrl = oEvent.getSource().getProperty("target");
								window.open(sUrl,'_blank');
							}
						}),
						new Text({text: {model:"local", path:"AssignedAt", type: "sap.ui.model.type.DateTime", formatOptions: {pattern:"dd.MM.yyyy /"} }}).addStyleClass("sapUiTinyMarginBeginEnd"),
						new Link({text:"{local>AssignedBy}"})
					]
				}).addStyleClass("sapUiMediumMarginBeginEnd")
			).addStyleClass("sapUiSmallMarginTopBottom");
			this.addContent(oVBox);
		},

		renderer: {}
	});
});