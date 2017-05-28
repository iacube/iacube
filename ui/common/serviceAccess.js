sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {
		ajax: function(settings) {
			var token;
			var path = "/iacube";
			var params = {
				type: typeof(settings.type) !== "undefined" ? settings.type : "get",
				dataType: typeof(settings.dataType) !== "undefined" ? settings.dataType : "json",
				url: settings.url,
				headers: (typeof settings.headers !== "undefined") ? settings.headers : "",
				async: (typeof settings.async !== "undefined") ? settings.async : true,
				data: (typeof settings.data !== "undefined") ? settings.data : "",
				contentType: (typeof settings.contentType !== "undefined") ? settings.contentType : "application/json; charset=utf-8",
				processData: (typeof settings.processData !== "undefined") ? settings.processData : true,
				beforeSend: (typeof settings.beforeSend !== "undefined") ? settings.beforeSend() : "",
				success: settings.success,
				statusCode: typeof(settings.statusCode) !== "undefined" ? settings.statusCode : "",
				error: function(data) {
					if (settings.error) {
						settings.error();
					}
				}
			};
			if (params.type !== "get" && params.type !== "GET") {
				$.ajax({
					url: path + "/services",
					type: "get",
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-CSRF-Token", "Fetch");
					},
					success: function(data, textStatus, XMLHttpRequest) {
						token = XMLHttpRequest.getResponseHeader("X-CSRF-Token");
						params.beforeSend = function(xhr) {
							xhr.setRequestHeader("X-CSRF-Token", token);
							if(typeof settings.beforeSend !== "undefined"){
								settings.beforeSend();
							}
						};
						$.ajax(params);
					}
				});
			} else {
				$.ajax(params);
			}
		}
	};
});