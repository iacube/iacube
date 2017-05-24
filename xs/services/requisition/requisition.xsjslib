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
			var dictionary = {
					
			};
			var key;
			var i,j;
			
			function addTo(what,where){
				
				what.forEach(function(entity){
					
					var newEntity = entity.toLowerCase();

					where[newEntity] = [];
					
					for(i = 0; i < responce[entity].length; i++){
						where[newEntity].push({});
						for(key in responce[entity][i]){
							if(responce[entity][i].hasOwnProperty(key)){
								where[newEntity][where[newEntity].length - 1][key] = responce[entity][i][key];
							}
						}
					}
				});
			}
			
			if(responce.DETAILS[0]){
				
				for(key in responce.DETAILS[0]){
					requisition[key] = responce.DETAILS[0][key];
				}

				addTo(["SKILLS","COMMENTS","CANDIDATES"],requisition);
				
				for(i = 0; i < requisition.candidates.length; i++){
					requisition.candidates[i].profiles = [];
					for(j = 0; j < responce.PROFILES.length; j++){
						if(responce.candidates[i].CandidateId === responce.PROFILES[j].CandidateId){
							requisition.candidates[i].profiles.push({
								ProfileId	  : responce.PROFILES[j].ProfileId,
								ExternalId	  : responce.PROFILES[j].ExternalId,
								ProfileTypeId : responce.PROFILES[j].ProfileTypeId,
								Link		  : responce.PROFILES[j].Link
							});
						}
					}
				}	
			}
			
			addTo(["COMMENTTYPES","PRIORITYTYPES","STATUSCODETYPES","STATUSTYPES","SUBCATEGORYTYPES"],dictionary);

			return {
				data 		: requisition,
				dictionary	: dictionary
			}
		}
	}
};