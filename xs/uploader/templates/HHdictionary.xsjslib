var template = {
	procedure:"iacube.db.procedures.HH::update_HH_Dictionary",
	parameters:{
 
	},
	getData : function(params,constants){

		var dest = $.net.http.readDestination(constants.uploadTemplatesPath,params.connectionId);
		var client = new $.net.http.Client();
		var req = new $.web.WebRequest($.net.http.GET, "");
		req.headers.set("User-Agent", "Mozilla/5.0");
		client.request(req, dest);
		var response = client.getResponse();
		
        var body;
        if (response.body) {
            body = response.body.asString();
        }
		return [];
	},
	transformation: function(data){
	    return [];
	}
};