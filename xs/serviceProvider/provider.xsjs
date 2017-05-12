var constants 	 = $.import("iacube.xs.resources","constants").constants;
var buildMessage = $.import(constants.resourcesPath,"buildMessage").init();
var responce	 = $.import(constants.serviceProviderPath,"responce").prepareResponce;
var request 	 = $.import(constants.serviceProviderPath,"request").prepareRequest;

var message 	 = buildMessage.get;
var replacer 	 = buildMessage.getReplacer(constants);

function processService(service,method,byProperty){
	
	var mainCall = service.call[method];
	var dbParameters = request({
		call		: byProperty ? service.call[method].byProperty : service.call[method],
		method		: method,
		byProperty	: byProperty
	});
	//execute DB call
	var connection = $.hdb.getConnection();

	var dbResult;
	
	try{
		
		dbParameters.forEach(function(call){

			if(call.procedure){
				//call procedure
				var loadedProcedure = connection.loadProcedure(constants.schema,call.procedure.replace(/\{(\w+)\}/g,replacer));
				dbResult = dbResult.concat(loadedProcedure.apply(connection,dbParameters));
			}else if(call.statement){
				//execute statement
				dbResult = dbResult.concat(connection.executeQuery.apply(connection,[call.statement.replace(/\{(\w+)\}/g,replacer)].concat(dbParameters)));
			}else{
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
				$.response.setBody(message(10004).DETAILS);
				return;
			}	
		});
		
		if(method !== "get" && responce(dbResult,mainCall)){
			//commit changes 
				connection.commit();   
		}
		
	}catch(error){
		//exception during DB call
		$.response.contentType = "application/json";
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(JSON.stringify(message(error.code || 0," ")));
	}
	connection.close();
}

//get name of service from request
var serviceName = $.request.parameters.get("service");

if(serviceName !== undefined){

	var method;
	//get http method name
	switch ($.request.method){
		case $.net.http.GET:
			method = "get";
			break;
		case $.net.http.POST:
			method = "post";
			break;
		case $.net.http.PUT:
			method = "put";
			break;
		case $.net.http.DEL:
			method = "del";
			break;
	}
	
	if(method){
		try{
			//load service files
			var servicesList = $.import(constants.serviceProviderPath,"serviceList");
			var service = $.import(servicesList.getServicePath(serviceName));

			if(!service.call[method]){
				//method is not supported by service
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
				$.response.setBody(message(10002,method).DETAILS);
			}else{
				//start service processing
				processService(service,method);
			} 
		}catch(e){
		//errors in service files
			$.response.status = $.net.http.SERVICE_UNAVAILABLE;
			$.response.setBody(message(10001).DETAILS);
		}
	}else{
		//http method is not allowed
		$.response.status = $.net.http.METHOD_NOT_ALLOWED;
		$.response.setBody(message(10000,method).DETAILS);
	}
}else{
	//can't find service name
	$.response.status = $.net.http.OK;
}