function getReplacer(list){
	return function(str,key){
		return list[key];
	};
}

var language = $.session.language.toUpperCase();
var defaultLanguage = "EN";
var messages;
var that = this;

function init(lang){
	
	var messageFile;
	var resourcesPath = $.import("iacube.xs.resources","constants").constants.resourcesPath;
	
	if(lang){
		language = lang;
	}
	
	try{
		//load file for session language
		messageFile = $.import(resourcesPath,"messages" + (language || defaultLanguage));
	}catch(e){
		messageFile = $.import(resourcesPath,"messages" + defaultLanguage);
	}
	messages =  messageFile.message;
	
	return that;
}

var a = 250;

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
