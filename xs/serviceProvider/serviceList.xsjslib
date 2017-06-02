function getServicePath(serviceName){
	
	var constants = $.import("iacube.xs.resources","constants").constants;
//Services
var service = {
		requisitions : constants.requisitionPath + "/requisitions",
		requisition  : constants.requisitionPath + "/requisition",
		requisitionsCount  : constants.requisitionPath + "/requisitionsCount",
		
		candidates: constants.candidatePath + "/candidates",
		candidate: constants.candidatePath + "/candidate",
	};
	
	return "/" + service[serviceName].replace(/\./g,"/") + constants.lib;
 }