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
		
		
		getLanguageText: function(sLanguCode, sLangEn, sLanguRu) {
			if(sLanguCode === "EN") {
				return sLangEn;
			}
			else if(sLanguCode === "RU"){
				return sLanguRu;
			}
		}

	};
 
	return formatter;
 
}, /* bExport= */ true);