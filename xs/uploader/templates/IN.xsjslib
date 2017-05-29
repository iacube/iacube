var template = {
	procedure:"iacube.db.procedures.IN::update_IN_Resumes",
	parameters:{
		id:{
			column: "ProfileId",
			type: "string"
		},
		name:{
			column :"Name",
			type : "string"
		}, 
		position:{
			column: "Position",
			type: "string"
		},
		location:{
			column: "Location",
			type: "string"
		},
		photo:{
			type:"string",
			column:"Photo"
		},
		publicprofile:{
			column:"Link",
			type:"string"
		},
		summary:{
			column: "Summary",
			type: "string"
		},
		experience: {
			company : {
				column:"Company",
				type:"string"
			},
			position: {
				column:"Position",
				type:"string"
			},
			daterange: {
				column:"Duration",
				type:"string"
			},
			description:{
				column:"Description",
				type:"string"
			}
		},
		skills: {
			asObject :{
				column:"Skill",
				type:"string"
			}
		},
		
	},
	getData : function(params,constants){
		return params.items;
	},
	transformation: function(data){
		
		var transformed = [];
		var template = {
			profile		: [],
			experience	: [],
			skills		: []
		};
		data.forEach(function(item){

			["experience","skills"].forEach(function(entry){
				if(item[entry]){
					item[entry].forEach(function(entity){
					   if(entry !== "experience" || (entity.Company && entity.Position)){
					       entity.ProfileId = item.ProfileId;
						   template[entry].push(entity);
					   }
					});
					delete item[entry];
				}
			});
			template.profile.push(item);
		});
		
		var key;
		
		for(key in template){
			if(template.hasOwnProperty(key)){
				transformed.push(template[key]);
			}
		}
		
		return transformed;
	}
};