var call = {
	get:{
		statement:"",
		parameters:{
			userID:{
				type:"string",
				name:"USER_ID"
			}
		},
		byProperty:{
			statement:"select {fields} from table where {condition}",
			parameters:{
				userID:{
					type:"string",
					name:"USER_ID",
					isKey:true
				}
			}
		}
	}	
		
}