var call = {
	get:{
		statement:"select * from IACUBE.\"iacube.db::tables.Profile.Profiles\"",
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
};