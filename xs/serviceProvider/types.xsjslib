var types = {
	other: {
		defaultValue:null,
		get:function(requestData){
			return requestData;
		}
	},
	filter:{
		defaultValue: "",
		get: function(requestData,transformation){
			
			var convertObject;
			var defaultValue = transformation.defaultValue !== undefined ? transformation.defaultValue : types.filter.defaultValue;
			var fields = [];

			if(requestData){
				if(typeof requestData === "object"){
					
					var key;
					var value;
					var operator;
					
					transformation = transformation.columns;
					
					for(key in requestData){
						if(requestData.hasOwnProperty(key) && transformation[key]){
							
							value = types[transformation[key].type || "other"].get(requestData[key],transformation[key]);
							switch(transformation[key].type){
								case "string":
									operator = " like ";
									value = value.replace(/\*/g,"%");
									break;
								
							default:
								operator = " = ";
							}
							
							fields.push("\"" + key + "\"" + operator + (transformation[key].type === "string" ? ("'" + value + "'") : value));
						}
					} 
					convertObject = fields.join(" and ");
				}else{
					convertObject = types[transformation.type].get(JSON.parse(requestData),transformation);
				}
				
			}else{
				convertObject = defaultValue; 
			}

			return convertObject;
		}
	},
	table:{
		defaultValue:[],
		get :function (requestData,transformation){
			
			var convertObject;
			var defaultValue = transformation.defaultValue !== undefined ? transformation.defaultValue : types.table.defaultValue;
			
			if(requestData){
				if(typeof requestData === "object"){
					//if data has complex type
					if(requestData.length === undefined){
						//if it is an object 
						convertObject = {};
						var key = "";
						
						transformation = transformation.columns;
						for(key in transformation){
							if (transformation.hasOwnProperty(key)){
								convertObject[transformation[key].name || key] = types[transformation.type].get(requestData[key] !== undefined ? requestData[key] : defaultValue);
							}
						}
					}else{
						//if it is an array
						var i;
						convertObject = []; 
						for(i = 0; i < requestData.length; i++){
							convertObject.push(types[transformation.type].get(requestData[i],transformation));
						}
					}
				}else{
					types[transformation.type].get(JSON.parse(requestData),transformation);
				}
			}else{
				convertObject = defaultValue;
			}
			
			return convertObject;
			
		}
	},
	paging: {
		defaultValue:[{t:null,s:0}],
		get: function (requestData,transformation){
		    
			var convertObject;
			var defaultValue = transformation.defaultValue !== undefined ? transformation.defaultValue : types.paging.defaultValue;
			
			if(requestData){
				if(typeof requestData === "object"){
					convertObject = defaultValue;
					["top","skip"].forEach(function(entry){
						if(requestData[entry]){
							convertObject[0][entry === "top" ? "t" : "s"] = types.integer.get(requestData[entry],{});
						}
					});
				}else{
					convertObject = types[transformation.type].get(JSON.parse(requestData),transformation);
				}
			}else{
				convertObject = defaultValue;
			}
			return convertObject;
		} 
	},
	string:{
		get: function (requestData,transformation){
		    
		    var defaultValue = transformation.defaultValue !== undefined ? transformation.defaultValue : types.other.defaultValue;
			
			return requestData ? requestData.toString() : defaultValue;
		}
	},
	integer:{
		get: function (requestData,transformation){
		    
		    var defaultValue = transformation.defaultValue !== undefined ? transformation.defaultValue : types.other.defaultValue;
		    
			return (requestData !== '' && requestData !== undefined && requestData !== null) ? parseInt(requestData,10) : defaultValue;
		    
		}
	},
	double:{
		get: function (requestData,transformation){
		    
		     var defaultValue = transformation.defaultValue !== undefined ? transformation.defaultValue : types.other.defaultValue;
		    
			return (requestData !== '' && requestData !== undefined && requestData !== null) ? parseFloat(requestData) : defaultValue;
		}
	}
};
