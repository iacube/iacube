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
				"CandidatesVisible": true,
				"MessagePageVisible": true,
				"TableMode": sap.m.ListMode.None,
				"RequisEditable": false,
				"RequisReadOnly": true,
				"Mode": "",

				"AvailablePriorities" : [ {
					"PriorityCode" : "H"
				}, {
					"PriorityCode" : "MI"
				}, {
					"PriorityCode" : "L"
				},
				{
					"PriorityCode" : "VH"
				},
				{
					"PriorityCode" : "MA"
				},
				],
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