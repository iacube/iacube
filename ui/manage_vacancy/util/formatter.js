sap.ui.define(function() {
	"use strict";
 
	var formatter = {
 
		formatReqStatus :  function (sStatus) {
				if (sStatus === "Open") {
					return "Success";
				} else if (sStatus === "Close"){
					return "Error";
				} else {
					return "None";
				}
		}
	};
 
	return formatter;
 
}, /* bExport= */ true);