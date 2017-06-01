var subscriptionKey = "835406d4c8c5436d8673fc347b19bc5f";
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
	var body;
	
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

    if(response && response.status === $.net.http.OK){
        body = response.body;
    }
    
	return body;
}

function translate(connection){

	var errors;
	
	try{
		//execute DB call
		var loadedProcedure = connection.loadProcedure(constants.schema,"iacube.db.procedures.document::getDocumentsForTranslation");

		languagePairs.forEach(function(pair){
			
			var i;
			var texts = loadedProcedure(pair.from,pair.to);

			if(texts.TEXTS && texts.TEXTS.length){
			    
			    pair.texts = [];
			
				for(i = 0; i < texts.TEXTS.length; i++){
					pair.texts.push({
						TextId		: texts.TEXTS[i].TextId,
						DestTextId	: texts.TEXTS[i].DestTextId,
						Content		: texts.TEXTS[i].Content
					});
				}
				
			}
		});

		var appId = $.util.stringify(call({
			destination:"translatorToken",
			method:"post",
			headers:[
				{
					name  : "Ocp-Apim-Subscription-Key",
					value : subscriptionKey
				}
			]
		}).asArrayBuffer());

		if(appId){

			var allTexts = [];
			
			languagePairs.forEach(function(pair){

				if(pair.texts){
				    
					var translated = [];
					
					builder(pair.texts,pair.from,pair.to,appId)
						.forEach(function(request){
							
							var body = call({
								destination:"translatorTexts",
								method:"post",
								headers:[{
									name  : "Content-Type",
									value : "application/xml"
								}],
								body:request
							});
							
							if(body){
							   translated = translated.concat(
								parser(
									body.asString()
								)
							); 
							}
							
							
					});

					pair.texts.forEach(function(text,i){
						text.Content = translated[i].replace(/\&/g,"&amp;");
					});
					allTexts = allTexts.concat(pair.texts);
				}
			});
			
			loadedProcedure = connection.loadProcedure(constants.schema,"iacube.db.procedures.document::translateDocuments");
			loadedProcedure(allTexts);
		}
	}catch(e){
		errors = true;
	}
	
	if(!errors){
		connection.commit();
	}
	return error;
}
