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
		
		getPriorityDescr: function(sPriority) {
			var priorFormatted;
			if (sPriority === "H") {
				priorFormatted = "{i18n>priorH}";
			} else if (sPriority === "M") {
				priorFormatted = "{i18n>priorM}";
			} else {
				priorFormatted = "{i18n>priorL}";
			}
			return priorFormatted;
		},
		
		getExperience: function(startDate, endDate) {
			return startDate - endDate;
		}
		
		// getCandidateLinksTitle: function(sFirstName, sSecondName) {
		// 	return sFirstName + " " + sSecondName + "Profiles";
		// }
	};
 
	return formatter;
 
}, /* bExport= */ true);