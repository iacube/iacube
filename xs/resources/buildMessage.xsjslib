function getReplacer(list){
	return function(str,key){
		return list[key];
	};
}

var messages = (function(){
	
	var messageFile;
	var resourcesPath = $.import("/iacube/xs/resources/constants.xsjslib").constants.resourcesPath;
	
	try{
		var language = $.session.language.toUpperCase();
		//load file for session language
		messageFile = $.import(resourcesPath,"messages" + language);
	}catch(e){
		messageFile = $.import(resourcesPath,"messagesEN");
	}
	return messageFile.message;
}());

var a = 100;

function get(code,params){

	if(!messages){
		return {
			STATUS : "E",
			MESSAGE: "Message File Error",
			DETAILS: "Can't load message file"
		};
	}
	if(!messages[code]){
		//message is not described in the file
		params = code;
		code = 0;
	}
	var details = messages[code].DETAILS || "";
	//add parameters to message
	if(params){
		var pArray = params.toString().split(";");
		var replacer = getReplacer(pArray);
		details = details.replace(/\{(\d+)\}/g,replacer);
	}
	return {
		STATUS : messages[code].STATUS,
		MESSAGE: messages[code].MESSAGE,
		DETAILS: details
	};
}
