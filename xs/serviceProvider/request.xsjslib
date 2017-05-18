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
			//TODO: add time and date
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
    
	return parametersArray;
}

function prepareByProperty(call,method){
	
	var serviceParameters = call.parameters;
	var parametersArray = [];
	var key;
	var bodyParameters 
	
	function transform(){
		//find parameters according to service definition
		for(key in serviceParameters){
			if(serviceParameters.hasOwnProperty(key) && bodyParameters[key] !== undefined){
				parametersArray.push(key === "flag" ? flag : transformForDb(bodyParameters[key], serviceParameters[key]));
			}
		}
	}

	if(method === "get"){
		//parameters from header for method "get"
		bodyParameters = $.request.parameters.get("byProperty");
		
		if(bodyParameters){
			bodyParameters = JSON.parse(bodyParameters);
		}else{
			bodyParameters = [];
		}
	}else{
		//parameters in body for others methods
		bodyParameters = JSON.parse($.request.body.asString());
	}	
	
	if(bodyParameters.length === undefined){
		bodyParameters = [bodyParameters];
	}
	
	var transformed = transformForDb(bodyParameters, serviceParameters);
	
	transformed.forEach(function(entry){
		var parametersObject = {
				fields		: [],
				values		: [],
				fieldValues : [],
				condition	: []
			};
		
		for(key in entry){
			if(entry.hasOwnProperty(key)){
				parametersObject.fields.push(key);
				parametersObject.values.push(entry(key));
				parametersObject.fieldValues.push(key + ' = ' + entry(key));
				if(serviceParameters[key].isKey){
					parametersObject.condition.push(key + ' = ' + entry(key));
				}
			}
		}
		parametersArray.push({
			statement: call.statement
							.replace("{fields}",parametersObject.fields.join(","))
							.replace("{values}",parametersObject.values.join(","))
							.replace("{fieldValues}",parametersObject.values.join(","))
							.replace("{condition}",parametersObject.values.join(" and ")),
			parameters:[]
		}); 
			
	});
			
	return parametersArray;
}

function prepareRequest(params){
	
	var prepared = [];
	 
	if(!params.byProperty){
		prepared = [{
			statement : params.call.statement,
			procedure : params.call.procedure,
			parameters: params.call.parameters ? prepareDbParameters(params.call.parameters,params.method) : []
		}];
	}else{
		prepared = prepareByProperty(params);
	}
	
	return prepared;
}