var constants 	 = $.import("iacube.xs.resources","constants").constants;
var buildMessage = $.import(constants.resourcesPath,"buildMessage").init();
var serviceResponce	 = $.import(constants.serviceProviderPath,"responce").prepareResponce;
//var request 	 = $.import(constants.serviceProviderPath,"request").prepareRequest;

var message 	 = buildMessage.get;
var replacer 	 = buildMessage.getReplacer(constants);

function transformForDb(requestData,transformation){

	var convertObject;

	if(requestData && typeof requestData === "object"){
	//if data has complex type
		if(requestData.length === undefined){
		    //if it is an object 
		    var key = "";
		    	
		    if(transformation.reduce){
		        
		        convertObject = [];
		        
		        for(key in transformation.reduce){
    				if (transformation.reduce.hasOwnProperty(key)){
    				    convertObject.push(transformForDb(requestData[key] !== undefined ? requestData[key] : "",transformation.reduce[key]));
    				}
    			}
		        
		        if(convertObject.length === 1){
    		        convertObject = convertObject[0];
    		    }
		    }else{
		        
    			convertObject = {};
	
    			for(key in transformation){
    				if (transformation.hasOwnProperty(key)){
    				    convertObject[transformation[key].column || key] = transformForDb(requestData[key] !== undefined ? requestData[key] : "",transformation[key]);
    				}
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
		if(transformation.asObject){
	       convertObject = {};
	       convertObject[transformation.asObject.column] = transformForDb(requestData,transformation.asObject);
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
    			case "timestamp":
    				convertObject = new Date(requestData);
    				break;
    			//TODO: add time and date
    			default:
    				convertObject = requestData;
	        }
		}
	}
	return convertObject;
}

function upload(list){
	
	//execute DB call
	var connection = $.hdb.getConnection();
	var dbResult = [];
	
	try{
		var i;
		var dbParameters;
		var preparedData;
		var loadedProcedure;
		
		for(i = 0; i < list.length; i++){
		    
			preparedData = transformForDb(list[i].template.getData(list[i].params,constants),list[i].template.parameters);
			dbParameters = list[i].template.transformation ? list[i].template.transformation(preparedData) : preparedData;
			
			if(list[i].template.procedure){
				//call procedure
				loadedProcedure = connection.loadProcedure(constants.schema,list[i].template.procedure.replace(/\{(\w+)\}/g,replacer));
				dbResult = dbResult.concat(loadedProcedure.apply(connection,dbParameters));
			}else{
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
				$.response.setBody(message(10004).DETAILS);
				return;
			}
		}
		
		if(serviceResponce(dbResult,{},message)){
			loadedProcedure = connection.loadProcedure(constants.schema,"iacube.db.procedures.document::updateDocuments");
			dbResult = dbResult.concat(loadedProcedure.apply(connection));
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
}
	
if(method){
	
	if(method === "get"){
		$.response.status = $.net.http.OK;
	}else{
		var bodyParameters = JSON.parse($.request.body.asString());
		var responce = [];
		
		try{
			//load service files
			var connections = $.import(constants.uploaderPath,"uploadList").connection;
			var uploadList = bodyParameters;

			if(!uploadList || !uploadList.length){
				//method is not supported by service
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
				$.response.setBody(message(10002,method).DETAILS);
			}else{
				//start service processing
				var preparedUploads = [];
				uploadList.forEach(function(entry){
					if(connections[entry.id]){
					    
					    entry.params.connectionId =  connections[entry.id].connection;
					    
						preparedUploads.push({
							template : $.import(constants.uploadTemplatesPath,connections[entry.id].template).template,
							params   : entry.params,
							id       : entry.id
						});
						
					}else{
						responce.push(message(16000,[entry]));
					}
				});
				upload(preparedUploads);
			} 
		}catch(e){
		//errors in service files
			$.response.status = $.net.http.SERVICE_UNAVAILABLE;
			$.response.setBody(message(10001).DETAILS);
		}
	}
}else{
	//http method is not allowed
	$.response.status = $.net.http.METHOD_NOT_ALLOWED;
	$.response.setBody(message(10000,[$.request.method]).DETAILS);
}
