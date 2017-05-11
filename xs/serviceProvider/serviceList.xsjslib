function getServicePath(serviceName){
	
	var constants = $.import("iacube.xs.resources","constants").constants;
//Services
var service = {
		
	};
	
	return "/" + service[serviceName].replace(/\./g,"/") + constants.lib;
 }