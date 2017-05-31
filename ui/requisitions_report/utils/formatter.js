sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {		
		formatReqStatus: function(sStatusCode){
			var oBundle = this.getResourceBundle();
			var sText = "N/A";
			switch (sStatusCode) {
				case "OPEN":
					sText = "req.status.open";
					break;
				case "CLOSED":
					sText = "req.status.closed";
					break;
				case "CANCEL":
					sText = "req.status.cancel";
					break;
				case "HOLD":
					sText = "req.status.hold";
					break
				case "REJECT":
					sText = "req.status.reject";
					break;
			}
			return oBundle.getText(sText);
		},
		
		formatSalary: function(sal){
			return sal.map(function(s){return s.Salary}).join(",");
		},
		
		formatDistanceState: function(dist){
			if(dist >= 75 && dist <= 100){
				return sap.ui.core.ValueState.Success;
			}else if(dist >= 50 && dist < 75){
				return sap.ui.core.ValueState.Warning;
			}else if(dist > 0 && dist < 50){
				return sap.ui.core.ValueState.Error;
			}else{
				return sap.ui.core.ValueState.None;
			}
		}
	}

});