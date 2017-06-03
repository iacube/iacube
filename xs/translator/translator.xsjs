var constants 	 = $.import("iacube.xs.resources","constants").constants;

var translate = $.import(constants.translatorPath,"translate").translate;

var connection = $.hdb.getConnection();

var result = translate(connection);

connection.close();
 
if(result.error){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody("Error duting text translation, not all was updated. " + result.count + " texts were updated");
}else if(!result.needUpdate){
	$.response.status = $.net.http.OK;
	$.response.setBody("Nothing needs to be updated");
}else{
    $.response.status = $.net.http.OK;
	$.response.setBody(result.count + " texts were updated");
}
