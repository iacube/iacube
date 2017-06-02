function property(name,data){
	return  " " + name + "=\"" + data + "\"";
}

function element(name,data,properties){
	/*0 is also false but need to be added as value*/
	return "<" + name + (properties || "") + (data !== undefined && data !== null && data !== ""  ? (">" + data + "</" + name + ">" || "") : "/>");
}

function request(texts, from, to, appId){
	
	var maxTextsPerRequest  = 2000;
	var maxLengthPerRequest = 9000;
	
	var tagsLength = 100;
	
	var maxStringLength = maxLengthPerRequest - tagsLength;

	var i;
	var n = 0;
	var l = 0;
	var textArray = [{ids:[],data:[]}];
	var requests = [];
	
    var text = "";
	var subText = "";
	
	if(to){
		for(i = 0; i < texts.length; i++){
			
			n++;
			text = texts[i].Content;

			do{
			    subText = text.substring(0,maxStringLength);
			    l += subText.length + tagsLength;
			    
			    text = text.slice(maxStringLength);
			   
			    if(n > maxTextsPerRequest || l > maxLengthPerRequest){
    				n = 0;
    				l = subText.length + tagsLength;
    				textArray.push({ids:[],data:[]});
    			}
			   
			    textArray[textArray.length - 1].data.push(
    				element(
    					"string",
    					subText.replace(/\&/g,"&amp;"),
    					" xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/Arrays\""
    				)
    			);
    			textArray[textArray.length - 1].ids.push(
    			    texts[i].id
    			);
			}while(text.length > maxStringLength);
	
		}
		
		textArray.forEach(function(entry){
			requests.push({
			    ids:entry.ids,
			    data:element(
					"TranslateArrayRequest",
					element("AppId","Bearer " + appId) +
					element("From",from) +
					element("Texts",entry.data.join("")) +
					element("To",to)
			    )
			});
		});
	}

	return requests;
}
