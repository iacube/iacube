var constants 	 = $.import("iacube.xs.resources","constants").constants;
//import messages
var buildMessage = $.import(constants.resourcesPath,"buildMessage").init();
var message 	 = buildMessage.get;
var replacer 	 = buildMessage.getReplacer(constants);

var responce	 = $.import(constants.serviceProviderPath,"responce").prepareResponce;
var request 	 = $.import(constants.serviceProviderPath,"request").prepareRequest;

//converts input parameters names for DB call
function transformForDb(requestData,transformation){

	var convertObject;

	if(requestData && typeof requestData === "object"){
	//if data has complex type
		if(requestData.length === undefined){
			//if it is an object 
			convertObject = {};
			var key = "";

			for(key in transformation){
				if (transformation.hasOwnProperty(key)){
					convertObject[transformation[key].name || key] = transformForDb(requestData[key] !== undefined ? requestData[key] : "",transformation[key]);
				}
			}
		}else{
			//if it is an array
			var i;
			convertObject = [];
			//split data between D,I,U properties in object or put them into array 
			for(i = 0; i < requestData.length; i++){
				convertObject.push(transformForDb(requestData[i],transformation));
			}
		}
	}else{
		//simple type
		switch(transformation.type){
			case "string":
				convertObject = requestData ? requestData.toString() : null;
				break;
			case "integer":
				convertObject = (requestData !== '' && requestData !== undefined && requestData !== null) ? parseInt(requestData, 10) : null;
				break;
			case "double":
				convertObject = (requestData !== '' && requestData !== undefined && requestData !== null) ? parseFloat(requestData) : null;
				break;
			case "array":
				convertObject = JSON.parse(requestData);
				break;
			default:
				convertObject = requestData;
		}
	}
	return convertObject;
}
//function processes header or body parameters and convert them to object for DB call
function prepareDbParameters(serviceParameters,method){

	var parametersArray = [];
	var key;

	if(method === "get"){
		//parameters from header for method "get"
		var i;
		var name = "";
		var parameters = $.request.parameters;
		
		for(i = 0; i < parameters.length; i++){
			name = parameters[i].name;
			if( name !== "service" && serviceParameters[name]){
				parametersArray.push(transformForDb(parameters[i].value, serviceParameters[name]));
			}
		}
	}else{
		//parameters in body for others methods
		var bodyParameters = JSON.parse($.request.body.asString());
		var flag  = "";
		//get flag according to method
		switch(method){
			case "del":
				flag = "D";
				break;
			case "post":
				flag = "I";
				break;
			case "put":
				flag = "U";
				break;
		}
		//find parameters according to service definition
		for(key in serviceParameters){
			if(serviceParameters.hasOwnProperty(key) && bodyParameters[key] !== undefined){
				parametersArray.push(key === "flag" ? flag : transformForDb(bodyParameters[key], serviceParameters[key]));
			}
		}
	}
    //add replace all blanks and wrong data with null and return
	return parametersArray;//.join(",").replace(/""|'""'|NaN/g, "null");
}

function processService(service,method){
	
	var call = service.call[method];
	var dbParameters = request(call.parameters,method);
	//execute DB call
	
	var connection = $.hdb.getConnection();

	try{
		
		var dbResult;
		
		if(call.procedure){
			//call procedure
			var loadedProcedure = connection.loadProcedure(constants.schema,call.procedure.replace(/\{(\w+)\}/g,replacer));
			dbResult = loadedProcedure.apply(connection,dbParameters);
		}else if(call.statement){
			//execute statement
			dbResult = connection.executeQuery.apply(connection,[call.statement.replace(/\{(\w+)\}/g,replacer)].concat(dbParameters));
		}else{
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody(message(10004).DETAILS);
			return;
		}
		
		if(method !== "get" && responce(dbResult,call)){
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