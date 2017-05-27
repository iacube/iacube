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
				else if(sCommId === "OPEN"){
					return "sap-icon://create-form"
				}
				else if(sCommId === "OTHER"){
					return "sap-icon://employee"
				}
				else if(sCommId === "EMAIL"){
					return "sap-icon://email"
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
			
			getPriorDescr: function (sPriorCode, sPriorL, sPriorMA, sPriorMI, sPriorH, sPriorN, sPriorVH) {
				switch (sPriorCode) {
					case "H":
						return sPriorH;
						break;
					case "MA":
						return sPriorMA;
						break;
					case "MI":
						return sPriorMI;
						break;
					case "N":
						return sPriorN;
						break;
					case "VH":
						return sPriorVH;
						break;
					case "L":
						return sPriorL;
						break;
						}
			},
			
			getCommentStatus: function(sCommentStatusId) {
				switch (sCommentStatusId) {
				case "E":
					return "Error";
					break;
				case "W":
					return "Warning";
					break;
				case "I":
					return "Information";
					break;
				case "S":
					return "Success";
					break
					}
			}
			
	};
	
	return formatterCom;
	
});