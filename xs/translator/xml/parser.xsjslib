function getTexts(response){
	
	var translatedTextStart = "<TranslatedText>";
	var translatedTextEnd   = "</TranslatedText>";
	
	var copy = response;
	
	var s = 0;
	var e = 0;
	var sl = translatedTextStart.length;
	var el = translatedTextEnd.length;
	
	var texts = [];
	
	while(copy.search(translatedTextStart) !== -1){
		
		s = copy.indexOf(translatedTextStart);
		e = copy.indexOf(translatedTextEnd);
		
		texts.push(copy.substring(s + sl,e));
		
		copy = copy.substring(e + el);
	}
	return texts;
}
