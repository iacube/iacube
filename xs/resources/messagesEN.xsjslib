var message = { 
//Default Message
	0:{
		STATUS: "E",
		MESSAGE: "Error",
		DETAILS: "Error {0}"
	},
//SQL
	258 :{
		STATUS: "E",
		MESSAGE: "Authorization Error",
		DETAILS: "User is not authorized"
	},
	2048 :{
		STATUS: "E",
		MESSAGE: "Database Error",
		DETAILS: "Column Store Error"
	},
	2950 :{
		STATUS: "E",
		MESSAGE: "Authorization Error",
		DETAILS: "User is not authorized"
	},
//service 
	10000:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Unsupported HTTP Method \"{0}\""
	},
	10001:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Requested Service Not Found"
	},
	10002:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Service does not support method \"{0}\""
	},
	10003:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Can't find Service Name in URL"
	},
	10004:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Can't find SQL query or Procedure for execution"
	},
//services starts from 15000
	15001:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Requisition ID '{0}'"
	},
	15002:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Candidate ID '{0}'"
	},
	15003:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Candidate Status '{0}'"
	},
	15004:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Comment Type '{0}'"
	},
	15005:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Priority '{0}'"
	},
	15006:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Requisition Status '{0}'"
	},
	15007:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Subcategory '{0}'"
	},
	15008:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Wrong Comment Status '{0}'"
	},
	15009:{
		STATUS: "E",
		MESSAGE: "Service Error",
		DETAILS: "Blank skill"
	},
//upload from external systems
	16000:{
		STATUS: "E",
		MESSAGE: "Upload Error",
		DETAILS: "Can't find upload template for {0}"
	}
};