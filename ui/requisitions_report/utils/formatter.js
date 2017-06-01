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
		
		formatReqState: function(sStatusCode){
			var sText = "None";
			switch (sStatusCode) {
				case "OPEN":
					sText = "Success";
					break;
				case "CLOSED":
					sText = "Error";
					break;
				case "CANCEL":
					sText = "Warning";
					break;
				case "HOLD":
					sText = "None";
					break
				case "REJECT":
					sText = "Error";
					break;
			}
			return sText;
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
		},
		
		formatCandStatusText: function(sStatusCode){
			var oBundle = this.getResourceBundle();
			var sText = "N/A";
			switch (sStatusCode) {
				case "PROPOSED":
					sText = "cand.status.proposed";
					break;
				case "ASSIGNED":
					sText = "cand.status.assigned";
					break;
				case "APPROVED":
					sText = "cand.status.approved";
					break;
				case "REJECTED":
					sText = "cand.status.rejected";
					break;
			}
			return oBundle.getText(sText);
		},
		
		formatCandStatusState: function(sStatusCode){
			var sState = "None";
			switch (sStatusCode) {
				case "PROPOSED":
					sState = "Warning";
					break;
				case "ASSIGNED":
					sState = "None";
					break;
				case "APPROVED":
					sState = "Success";
					break;
				case "REJECTED":
					sState = "Error";
					break;
			}
			return sState;
		}
	}

});