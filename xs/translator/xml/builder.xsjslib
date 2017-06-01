function property(name,data){
	return  " " + name + "=\"" + data + "\"";
}

function element(name,data,properties){
	/*0 is also false but need to be added as value*/
	return "<" + name + (properties || "") + (data !== undefined && data !== null && data !== ""  ? (">" + data + "</" + name + ">" || "") : "/>");
}

function request(texts, from, to, appId){
	
	var maxTextsPerRequest  = 2000;
	var maxLEngthPreRequest = 10000;
	
	var i;
	var n = 0;
	var l = 0;
	var textArray = [[]];
	var requests = [];
	
	if(to){
		for(i = 0; i < texts.length; i++){
			
			n++;
			l += texts[i].Content.length;
			
			if(n > maxTextsPerRequest || l > maxLEngthPreRequest){
				n = 0;
				l = 0;
				textArray.push([]);
			}
			textArray[textArray.length - 1].push(
				element(
					"string",
					texts[i].Content.replace("&","&amp;"),
					" xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/Arrays\""
				)
			);
		}
		
		textArray.forEach(function(entry){
			requests.push(
				element(
					"TranslateArrayRequest",
					element("AppId","Bearer " + appId) +
					element("From",from) +
					element("Texts",entry.join("")) +
					element("To",to)
			));
		});
	}

	return requests;
}
