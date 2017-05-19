var call = {
	get:{
		procedure:"iacube.db.procedures.candidate::searchCandidates",
		parameters:{
			/*top:{
				type:"integer"
			},
			skip:{
				type:"integer"
			},
			*/
			searchTerm:{
				type:"string"
			},
			/*
			filter:{
				type:"array",
				columns:{
					Name:{
						type:"string",
					},
					Value:{
						type:"string"
					}
				}
			}*/
		},
		result: function(responce){
			
			var i,j;
			var candidate = {};
			var result = [];
			
			for(i = 0; i < responce.CANDIDATES; i++){
				
				candidate = {
					CandidateId:responce.CANDIDATES[i].CandidateId,
					LastName:responce.CANDIDATES[i].LastName,
					FirstName:responce.CANDIDATES[i].FirstName,
					Location:responce.CANDIDATES[i].Location,
					ProfArea:responce.CANDIDATES[i].ProfArea
				};
				
				["PROFILES","SALARY","CONTACTS","LANGUAGES","REQUISITIONS"].forEach(function(entity){
					
					var newEntity = entity.toLowerCase();
					
					candidate[newEntity] = [];
					
					for(j = 0; j < responce[entity].length; i++){
						if(responce.CANDIDATES[i].CandidateId === responce[entity][j].CandidateId)
							candidate[newEntity].push(responce[entity][j]);
					}
				});
				
				result.push(candidate);
			}
			
			return requisition;
		}
	}	
};