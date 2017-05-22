// common formatter
sap.ui.define([
	],
	function() {
	"use strict";
	
	var formatterCom = {
 
			getCommentIcon: function(sCommId){
				if(sCommId === "CALL"){
					return "sap-icon://outgoing-call";
				}
				else if(sCommId === "NOTE"){
					return "sap-icon://notes";
				}
			},
			
			getCommentType: function(sCommId, sCommCall, sCommNote){
				if(sCommId === "CALL"){
					return sCommCall;
				}
				else if(sCommId === "NOTE"){
					return sCommNote;
				}
			},
			
			getPriorDescr: function (sPriorCode, sPriorLow, sPriorMedium, sPriorHigh) {
				switch (sPriorCode) {
					case "H":
						return sPriorHigh;
						break;
					case "M":
						return sPriorMedium;
						break;
					case "L":
						return sPriorLow;
						break
						}
			},
			
	};
	
	return formatterCom;
	
});