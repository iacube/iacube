function getServicePath(serviceName){
	
	var constants = $.import("iacube.xs.resources","constants").constants;
//Services
var service = {
		test : constants.servicesPath + "/test"
	};
	
	return "/" + service[serviceName].replace(/\./g,"/") + constants.lib;
 }