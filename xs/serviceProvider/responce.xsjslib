function convertToResult(resultObject,transformation){

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

function prepareResponce(dbResult,call){
	
	var body = "";
	var commitAllowed = true;
	
	$.response.contentType = "application/json";
	
	if(typeof call.result === "function"){
		body = call.result(dbResult);
	}else if(typeof call.result === "object"){
		body = JSON.stringify(convertToResult(dbResult,call.result));
	}else{
		//don't transform
		body = JSON.stringify(convertToResult(dbResult,{}));
	}
	if(call.noCommitIfErrors){
		if(dbResult.ERRORS.length !== 0){
			commitAllowed = false;
		}
	}
	
	//response
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
	
	return commitAllowed;
}
		