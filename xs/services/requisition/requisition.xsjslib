var call = {
	get:{
		procedure:"iacube.db.procedures.requisition::getRequisition",
		parameters:{
			reqId:{
				type:"integer"
			}
		},
		result: function(responce){
			
			var requisition = {};
			var key;
			var i,j;
			
			if(responce.DETAILS[0]){
				
				for(key in responce.DETAILS[0]){
					requisition[key] = responce.DETAILS[0][key];
				}

				["SKILLS","COMMENTS","CANDIDATES"].forEach(function(entity){
					
					var newEntity = entity.toLowerCase();
					
					requisition[newEntity] = [];
					
					for(i = 0; i < responce[entity].length; i++){
						requisition[newEntity].push(responce[entity][i]);
					}
				});
				
				for(i = 0; i < requisition.candidates.length; i++){
					requisition.candidates[i].profiles = [];
					for(j = 0; j < responce.PROFILES.length; j++){
						if(responce.candidates[i].CandidateId === responce.PROFILES[j].CandidateId){
							requisition.candidates[i].profiles.push(responce.PROFILES[j]);
						}
					}
					
				}	
			}
			
			return requisition;
		}
	}	
};