sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createUiModel: function() {
			var oModel = new JSONModel({
				busy: {
					candidates: false,
					requisitions: false
				}
			});
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		}

	};
});