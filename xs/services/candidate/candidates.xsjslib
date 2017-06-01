var call = {
	get:{
		procedure:"iacube.db.procedures.candidate::getCandidates",
		parameters:{
			searchTerm:{
				type:"string",
				defaultValue:"*"
			},
			filter:{
				type : "filter",
				columns:{
					LastName:{
						type: "string"
					},
					FirstName:{
						type: "string"
					},
					Location:{
						type: "string"
					},
					ProfileTypeId:{
						type: "string"
					}/*,
					ReqId:{
						type:"integer"
					}*/
				}
			},
			paging:{
				type : "paging"
			},
			reqId:{
				type: "integer"
			}
		},
		result: function(responce){
			
			var i;
			var result = [];
			var filter = this.parameters.filter.columns;
			
			function addTo(candidate){
				["PROFILES","SALARY","CONTACTS","LANGUAGES","REQUISITIONS"].forEach(function(entity){
					var j;
					var newEntity = entity.toLowerCase();
					
					candidate[newEntity] = [];
					
					for(j = 0; j < responce[entity].length; j++){
						if(candidate.CandidateId === responce[entity][j].CandidateId){
							candidate[newEntity].push(responce[entity][j]);
						}
					}
				});
				return candidate;
			}
			
			for(i = 0; i < responce.CANDIDATES.length; i++){
				result.push(
					addTo({
						CandidateId : responce.CANDIDATES[i].CandidateId,
						LastName	: responce.CANDIDATES[i].LastName,
						FirstName	: responce.CANDIDATES[i].FirstName,
						Location	: responce.CANDIDATES[i].Location,
						ProfArea	: responce.CANDIDATES[i].ProfArea,
						Photo       : responce.CANDIDATES[i].Photo,
						Distance   : responce.CANDIDATES[i].Distance,
				}));
			}
			
			filter.ProfileTypeId.values = [];
			
			for(i = 0; i < responce.SITES.length; i++){
				filter.ProfileTypeId.values.push(responce.SITES[i].id);
			}
			
			return {
				data   		: result,
				filter 		: filter
			};
		}
	},
	put : {
		procedure:"iacube.db.procedures.candidate::assignCandidates",
		parameters:{
			candidates:{
				type:"table",
				columns:{
					ReqId:{
						type:"integer"
					},
					CandidateId	: {
						type: "integer"
					},
					StatusId : {
						type: "string"
					},
					ProfileId : {
						type: "integer"
					},
					Distance : {
						type: "double"
					},
					flag :{
						type:"string"
					}
				}
			}
		}
	}
};