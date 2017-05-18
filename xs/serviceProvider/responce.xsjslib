function convertToResult(resultObject,transformation,message){

	var returnObject;
	var name = "";
	var key = "";
	
	if(resultObject !== undefined && resultObject !== null){
	    
	    var objectString = resultObject.toString();
	
        if(objectString === "[object ResultSet]"){
    	    returnObject = [];
        }else if(objectString === "[object Row]" || objectString === "[object ProcedureResult]"){
    	    returnObject = {};
    	}
        
        if(resultObject.ERROR_CODE){
            resultObject = message(resultObject.ERROR_CODE,resultObject.DETAILS);
        }
        if(returnObject){
           for(key in resultObject){
        		if (resultObject.hasOwnProperty(key)){
        			name = transformation[key] || key;
        			returnObject[name] = convertToResult(resultObject[key],transformation);
        		}
    	    } 
        }else{
    	    returnObject = resultObject !== undefined ? resultObject : "";
    	} 
        
    }else{
        returnObject = "";
    }
 
	return returnObject;
}

function prepareResponce(dbResult,call,message){
	
	var body = "";
	var commitAllowed = true;
	
	$.response.contentType = "application/json";
	
	if(typeof call.result === "function"){
		body = call.result(dbResult);
	}else if(typeof call.result === "object"){
		body = convertToResult(dbResult,call.result,message);
	}else{
		//don't transform
		body = convertToResult(dbResult,{},message);
	}
	if(call.noCommitIfErrors){
		if(dbResult.ERRORS.length !== 0){
			commitAllowed = false;
		}
	}
	
	//response
	$.response.setBody(typeof body === "string" ? body : JSON.stringify(body));
	$.response.status = $.net.http.OK;
	
	return commitAllowed;
}
		