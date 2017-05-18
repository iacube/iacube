function getServicePath(serviceName){
	
	var constants = $.import("iacube.xs.resources","constants").constants;
//Services
var service = {
		requisition : constants.requisitionPath + "/requisitions"
	};
	
	return "/" + service[serviceName].replace(/\./g,"/") + constants.lib;
 }