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

//upload from external systems
	16000:{
		STATUS: "E",
		MESSAGE: "Upload Error",
		DETAILS: "Can't find upload template for {0}"
	}
}