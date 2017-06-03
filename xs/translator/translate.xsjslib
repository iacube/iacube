
var subscriptionKey = "f4219210c55e4afd8a7b0c18c44aa486";

var languagePairs = [
	{from:"EN",to:"RU"},
	{from:"RU",to:"EN"}
];

var constants 	 = $.import("iacube.xs.resources","constants").constants;
var builder 	 = $.import(constants.translatorXMLPath,"builder").request;
var parser	 	 = $.import(constants.translatorXMLPath,"parser").getTexts;

function call(params){

	var dest = $.net.http.readDestination(constants.translatorPath,params.destination);
	var client = new $.net.http.Client();
	var req = new $.web.WebRequest($.net.http[params.method.toUpperCase()],"");
	var result = {};
	
	if(params.parameters){
		params.parameters.forEach(function(entry){
			req.parameters.set(entry.name,entry.value);
		});
	}
	if(params.headers){
		params.headers.forEach(function(entry){
			req.headers.set(entry.name,entry.value);
		});
	}
	if(params.method !== $.net.http.GET){
		req.setBody(params.body || "");
	}

	client.request(req, dest);
	var response = client.getResponse();
	client.close();
	
	if(response && response.status === $.net.http.OK){
		result.body = response.body;
	}else{
		result.error = true;
	}
	
	return result;
}

function translate(connection){

	var errors;
	var allTexts = [];
	var loadedProcedure;
	var needUpdate;
	
	try{
		//execute DB call
		loadedProcedure = connection.loadProcedure(constants.schema,"iacube.db.procedures.document::getDocumentsForTranslation");

		languagePairs.forEach(function(pair){
			
			var i;
			var texts = loadedProcedure(pair.from,pair.to);

			if(texts.TEXTS && texts.TEXTS.length){
				
				pair.texts = [];
			
				for(i = 0; i < texts.TEXTS.length; i++){
					pair.texts.push({
						id		  : i,
						TextId		: texts.TEXTS[i].TextId,
						DestTextId	: texts.TEXTS[i].DestTextId,
						Content		: texts.TEXTS[i].Content
					});
				}
				if(pair.texts.length){
				    needUpdate = true;
				}
			}
		});
		
		if(needUpdate){

            var appId;
    		var called = call({
    			destination:"translatorToken",
    			method:"post",
    			headers:[
    				{
    					name  : "Ocp-Apim-Subscription-Key",
    					value : subscriptionKey
    				}
    			]
    		});
		
    		if(called.error){
    		    errors = true;
    		}else{
    		    appId = $.util.stringify(called.body.asArrayBuffer());
    		}
        
    		if(appId){
    
    			languagePairs.forEach(function(pair){
    
    				if(pair.texts){
    					
    					var translated = [];
    					
    					var requests = builder(pair.texts,pair.from,pair.to,appId);
    					
    					requests.forEach(function(request){
    						
    							
    						var called = call({
    							destination:"translatorTexts",
    							method:"post",
    							headers:[{
    								name  : "Content-Type",
    								value : "application/xml"
    							}],
    							body:request.data
    						});
    						
    						var body = called.body;
    						
    						if(called.error){
    							errors = true;
    						}
    						
    						if(body){
    							var k;
    							var parsed = parser(body.asString(),request.ids);
    							for(k = 0;k < parsed.length; k++){
    								if(parsed[k]){
    									translated[k] = translated[k] ? translated[k] + parsed[k] : parsed[k];
    								}
    							}
    						}
    					});
    
    					pair.texts.forEach(function(text,i){
    						if(translated[i]){
    							text.Content = translated[i].replace(/\&/g,"&amp;");
    						}
    					});
    					allTexts = allTexts.concat(pair.texts);
    				}
    			});
    		}
		}
	}catch(e){
		errors = true;
	}
	
	var updated = 0;
	try{
        if(allTexts.length){
            var dbData = [];
            allTexts.forEach(function(text){
                dbData.push({
					TextId		: text.TextId,
					DestTextId	: text.DestTextId,
					Content		: text.Content
				});
	       });

            loadedProcedure = connection.loadProcedure(constants.schema,"iacube.db.procedures.document::translateDocuments");
            loadedProcedure(dbData);
            connection.commit();
            updated =  allTexts.length;
    	} 
	}catch(e){
		errors = true;
	}

	return {
		count : updated,
		error : errors,
		needUpdate : needUpdate
	};
}
