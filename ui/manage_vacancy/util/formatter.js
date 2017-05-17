sap.ui.define(function() {
	"use strict";
 
	var formatter = {
 
		formatReqStatus :  function (sStatus) {
				if (sStatus === "Open" || sStatus === "New") {
					return "Success";
				} else if (sStatus === "Close"){
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
		}
	};
 
	return formatter;
 
}, /* bExport= */ true);