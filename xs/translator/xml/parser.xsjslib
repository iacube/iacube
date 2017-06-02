function getTexts(response,ids){
	
	var translatedTextStart = "<TranslatedText>";
	var translatedTextEnd   = "</TranslatedText>";
	
	var i = 0;
	var s = 0;
	var e = 0;
	var sl = translatedTextStart.length;
	var el = translatedTextEnd.length;
	
	var texts = [];
	var subText = "";
	while(response.search(translatedTextStart) !== -1){
		
		s = response.indexOf(translatedTextStart);
		e = response.indexOf(translatedTextEnd);
		
		if(ids[i] !== undefined){
		    subText = response.substring(s + sl,e);
		    texts[ids[i]] = texts[ids[i]] ? texts[ids[i]] + subText : subText;
		}
		response = response.substring(e + el);
		i++;
	}
	return texts;
}
