var constants = $.import("iacube.xs.resources","constants").constants;
var types 	  = $.import(constants.serviceProviderPath,"types").types;

function transformForDb(requestData,transformation,isDefault){

	var result;
	
	if(isDefault){
	    
	    var defaultValue = (types[transformation.type] &&  types[transformation.type].defaultValue !== undefined)  ? types[transformation.type].defaultValue : types.other.defaultValue;
	    
		result = transformation.defaultValue !== undefined ? transformation.defaultValue : defaultValue;
	}else{
		result = transformation.type ? types[transformation.type].get(requestData,transformation) : types.other.get(requestData);
	}
	return result;
}
//function processes header or body parameters and convert them to object for DB call
function prepareDbParameters(serviceParameters,method){

	var parametersArray = [];
	var key;
	var parameter;
	
	if(method === "get"){
		//parameters from header for method "get"
		var parameters = $.request.parameters;
		
		for(key in serviceParameters){
			if(serviceParameters.hasOwnProperty(key)){
				parameter = parameters.get(key);
				parametersArray.push(transformForDb(parameter, serviceParameters[key], parameter ? false : true));
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
			if(serviceParameters.hasOwnProperty(key)){
				parameter = key === "flag" ? flag : bodyParameters[key];
				parametersArray.push(transformForDb(bodyParameters[key], serviceParameters[key],bodyParameters[key] !== undefined ? false : true));
			}
		}
	}
	return parametersArray;
}

/*function prepareByProperty(call,method){
	
	var serviceParameters = call.parameters;
	var parametersArray = [];
	var key;
	var bodyParameters; 
	
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
}*/

function prepareRequest(params){
	
	var prepared = [];
	 
	if(!params.byProperty){
		prepared = [{
			statement : params.call.statement,
			procedure : params.call.procedure,
			parameters: params.call.parameters ? prepareDbParameters(params.call.parameters,params.method) : []
		}];
//	}else{
//		prepared = prepareByProperty(params);
	}
	
	return prepared;
}