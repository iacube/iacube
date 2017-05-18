var call = {
	get:{
		statement:
			'SELECT ' +
					'a."ReqId",' +
		            'a."Title",' +
		            'a."ProjectId",' +
		            'a."PriorityId",' +
		            'a."Location",' +
		            'a."StatusCodeId",' +
		            'b."Name" AS "SubcategoryName",' +
		            'a."CreatedBy",' +
		            'a."CreatedAt",' +
		            'TO_INTEGER(COUNT(c."CandidateId")) AS "Candidates"' +
				' FROM {schema}."{dbPath}::tables.Requisition.Requisitions" AS a' +
		        ' LEFT JOIN {schema}."{dbPath}::tables.Requisition._dictionary.SubcategoryTypes" AS b' + 
		        	' ON a."SubcategoryId" = b."Id"' +
		        ' LEFT JOIN {schema}."{dbPath}::tables.Requisition.Candidates" AS c' +
		        	' ON a."ReqId" = c."ReqId"' +
		        ' GROUP BY ' +
		        	'a."ReqId",' +
		        	'a."Title",' +
		            'a."ProjectId",' +
		            'a."PriorityId",' +
		            'a."Location",' +
		            'a."StatusCodeId",' +
		            'b."Name",' +
		            'a."CreatedBy",' +
		        	'a."CreatedAt"'
	}	
};