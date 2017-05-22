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
				} else if (sStatus === "CLOSE"){
					return "Error";
				} else {
					return "None";
				}
		},
		
		formatCandStatus :  function (sStatus) {
			if (sStatus === "APPROVED") {
				return "Success";
			} else if (sStatus === "PROPOSED"){
				return "Error";
			} else {
				return "None";
			}
		},
		
		
		getLanguageText: function(sLanguCode) {
			if(sLanguCode === "EN" || sLanguCode === "en_EN") {
				return "English";
			}
			else if(sLanguCode === "RU" || sLanguCode === "ru_RU"){
				return "Русский";
			}
		}

	};
 
	return formatter;
 
}, /* bExport= */ true);