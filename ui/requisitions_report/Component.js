sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"requisitions_report/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("requisitions_report.Component", {

		metadata: {
			manifest: "json"
		},
		
		constructor: function(){
			jQuery.sap.registerModulePath("iacube.ui.common", "../common");
			UIComponent.prototype.constructor.apply(this, arguments);
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createUiModel(), "ui");
			
			this.getRouter().initialize();
		}

	});
});