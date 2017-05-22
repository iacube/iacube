sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"manage_vacancy/model/models",
	"sap/ui/model/json/JSONModel"
	], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("manage_vacancy.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
// 			var oLocalModel = new JSONModel("requis");
// 			this.setModel(oLocalModel);
			
			this.setModel(models.createUiModel(), "ui");
		
			this.getRouter().initialize();
		}
		//test comment
});
});