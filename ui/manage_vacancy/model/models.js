sap.ui.define([ "sap/ui/model/json/JSONModel", "sap/ui/Device" ], function(
		JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel : function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createUiModel : function() {
			var oModel = new JSONModel({
				"AvailablePriorities" : [ {
					"PriorityCode" : "H"
				}, {
					"PriorityCode" : "M"
				}, {
					"PriorityCode" : "L"
				} ],
				"AvailableLanguages" : [ {
					"SlsLang" : "EN"
				}, {
					"SlsLang" : "RU"
				} ],
			});
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		}

	};
});