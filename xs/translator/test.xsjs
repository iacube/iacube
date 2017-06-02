var constants 	 = $.import("iacube.xs.resources","constants").constants;

var translator = $.import(constants.translatorPath,"translator").translate;
var connection = $.hdb.getConnection();

translator(connection);