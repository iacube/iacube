sap.ui.define([
	"sap/ui/core/format/DateFormat"
	],
	function(DateFormat) {
	"use strict";
 
	var formatter = {
		
		formatDate: function(sDate) {
			var oDateFormat = DateFormat.getDateTimeInstance({pattern: "dd.MM.YYYY"});
			return oDateFormat.format(new Date(sDate));
		},
 
		formatReqStatus :  function (sStatus) {
				if (sStatus === "OPEN" || sStatus === "NEW") {
					return "Success";
				} else if (sStatus === "CLOSED"){
					return "Error";
				} else {
					return "None";
				}
		},
		
		formatCandStatus :  function (sStatus) {
			if (sStatus === "APPROVED") {
				return "Success";
			} else if (sStatus === "REJECTED"){
				return "Error";
			} else if (sStatus === "ASSIGNED"){
				return "Warning";
			} else {
				return "None";
			}
		},
		
		
		getLanguageText: function(sLanguCode, sLangEn, sLanguRu) {
			if(sLanguCode === "EN") {
				return sLangEn;
			}
			else if(sLanguCode === "RU"){
				return sLanguRu;
			}
		},
		
		getReqStatusText: function(sText, sOpen, sClose, sNew) {
			if (sText == "OPEN") {
				return sOpen;
			} else if (sText == "CLOSED"){
				return sClose;
			} else if (sText == "NEW") {
				return sNew;
			}
		},
		
		getCandStatusText: function(sText, sProp, sAss, sAppr, sRej){
			if (sText == "APPROVED") {
				return sAppr;
			} else if (sText == "REJECTED"){
				return sRej;
			} else if (sText == "ASSIGNED"){
				return sAss;
			} else if (sText == "PROPOSED") {
				return sProp;
			}
		},
		
		formatCandDistance: function(sDistance){
			if (sDistance < 40) {
				return "Error"
			}
			else if (sDistance > 70){
				return "Success"
			}
			else {
				return "Warning"
			}
		}

	};
 
	return formatter;
 
}, /* bExport= */ true);