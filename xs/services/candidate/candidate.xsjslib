var call = {
	get:{
		procedure:"iacube.db.procedures.candidate::getCandidate",
		parameters:{
			candidateId:{
				type:"integer"
			}
		},
		result: function(responce){
			
			var candidate = {};
			var key;
			var i,j;
			
			function addTo(what,where,ifc){
				
				what.forEach(function(entity){
						
					var newEntity = entity.toLowerCase();
					var k;
					
					where[newEntity] = [];
					
					var prepate;
					
					for(k = 0; k < responce[entity].length; k++){
						if(!ifc || where[ifc] === responce[entity][k][ifc]){
						    prepate = {};
							for(key in responce[entity][k]){
								if(responce[entity][k].hasOwnProperty(key) && key !== ifc){
									prepate[key] = responce[entity][k][key];
								}
								
							}
							where[newEntity].push(prepate);
						}
					}
				});
			}
			
			if(responce.CANDIDATE[0]){
				for(key in responce.CANDIDATE[0]){
					if(responce.CANDIDATE[0].hasOwnProperty(key)){
						candidate[key] = responce.CANDIDATE[0][key];
					}
				}
				addTo(["CONTACTS","LANGUAGES","PROFILES","REQUISITIONS"],candidate);
				for(i = 0; i < candidate.profiles.length; i++){
					addTo(["EMPLOYMENTS","EXPERIENCE","SCHEDULES"],candidate.profiles[i],"ProfileId");
					candidate.profiles[i].skills = [];
					for(j = 0; j < responce.SKILLS.length; j++){
						if(candidate.profiles[i].ProfileId === responce.SKILLS[j].ProfileId){
							candidate.profiles[i].skills.push(responce.SKILLS[j]);
						}
					}
				}	
			}
			
			return candidate;
		}
	}
};