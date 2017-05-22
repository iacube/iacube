var call = {
	get:{
		procedure: "iacube.db.procedures.requisition::getRequsitions",
		parameters:{
			searchTerm:{
				type		:"string",
				defaultValue:"*"
			},
			filter:{
				type	: "filter",
				columns : {
					ReqId: {
						type: "integer"
					},
					Title:{
						type:"string"
					},
					SubcategoryId:{
						type:"list"
					},
					StatusCodeId:{
						type:"integer"
					}
				}
			},
			paging:{
				type	: "paging"
			}
		},
		result: function(responce){
			
			var i;
			var result = [];
			var filter = this.parameters.filter.columns;
			
			function addTo(requisition){
				["CANDIDATES"].forEach(function(entity){
					var j;
					var newEntity = entity.toLowerCase();
					
					requisition[newEntity] = [];
					
					for(j = 0; j < responce[entity].length; j++){
						if(requisition.ReqId === responce[entity][j].ReqId){
							requisition[newEntity].push(responce[entity][j]);
						}
					}
				});
				return requisition;
			}
			
			for(i = 0; i < responce.REQUISITIONS.length; i++){
				result.push(
					addTo({
						ReqId: responce.REQUISITIONS[i].ReqId,
						Title: responce.REQUISITIONS[i].Title,
						ProjectId: responce.REQUISITIONS[i].ProjectId,
						PriorityId: responce.REQUISITIONS[i].PriorityId,
						Location: responce.REQUISITIONS[i].Location,
						StatusCodeId: responce.REQUISITIONS[i].StatusCodeId,
						SubcategoryId: responce.REQUISITIONS[i].SubcategoryId,
						SubcategoryName: responce.REQUISITIONS[i].SubcategoryName,
						CreatedBy: responce.REQUISITIONS[i].CreatedBy,
						CreatedAt: responce.REQUISITIONS[i].CreatedAt,
						OpenedBy: responce.REQUISITIONS[i].OpenedBy,
						OpenedAt: responce.REQUISITIONS[i].OpenedAt
				}));
			}
			
			filter.SubcategoryId.values = [];
			filter.StatusCodeId.values  = [];
			
			
			for(i = 0; i < responce.STATUSCODETYPES.length; i++){
				filter.StatusCodeId.values.push(responce.STATUSCODETYPES[i].id);
			}
			for(i = 0; i < responce.SUBCATEGORYTYPES.length; i++){
				filter.SubcategoryId.values.push({
					id	 : responce.SUBCATEGORYTYPES[i].id,
					name : responce.SUBCATEGORYTYPES[i].name,
				});
			}
			
			return {
				data   		: result,
				filter 		: filter
			};
		}
	}	
};