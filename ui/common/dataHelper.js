sap.ui.define([
		"sap/m/MessageToast",
		"iacube/ui/common/serviceAccess"
	],
	function(MessageToast, ServiceAccess) {
		"use strict";
		return {
			/* Data retrieval */
			/**
			 * Retrieves requisitions data. Returns a Promise.
			 * 
			 * @param {sap.ui.core.UIComponent} oComp link to the Component
			 * @param {array} aContents Contents entity
			 * @returns {Promise} Standard Promise
			 * @public
			 */
			
			/*REQUISITION*/
			getRequisitions: function(oComp, aContents) {
				return new Promise(function(resolve, reject) {
					var sPath = "/iacube/service/requisitions";
					ServiceAccess.ajax({
						url: sPath,
						success: function(data) {
							resolve(data);
						},
						error: function() {
							MessageToast.show("Data retrieval error");
							reject();
						}
					});
				});
			},
			
			getRequisition: function(ReqId) {
				return new Promise(function(resolve, reject) {
					var sPath = "/iacube/service/requisition/"+ReqId;
					ServiceAccess.ajax({
						url: sPath,
						success: function(data) {
							resolve(data);
						},
						error: function() {
							MessageToast.show("Data retrieval error");
							reject();
						}
					});
				});
			},
			
			createRequisition: function(oRequisition) {
				return new Promise(function(resolve, reject) {
					var sPath = "/iacube/service/requisitions";
					ServiceAccess.ajax({
						type: "PUT",					
						url: sPath,
						data: oRequisition,
						success: function(data) {
							resolve(data);
						},
						error: function() {
							MessageToast.show("Data retrieval error");
							reject();
						}
					});
				});
			},
			
			/*CANDIDATES*/
			
			getCandidates: function(requisitionId){
				return new Promise(function(resolve, reject) {
					var sPath = "/iacube/service/candidates?filter="+JSON.stringify({ReqId:requisitionId});
					ServiceAccess.ajax({
						url: sPath,
						success: function(data) {
							resolve(data);
						},
						error: function() {
							MessageToast.show("Data retrieval error");
							reject();
						}
					});
				});
			},
			
			assignCandidatesToRequisitions: function(oCandAssigned){
				return new Promise(function(resolve, reject) {
					var sPath = "/iacube/service/candidates";
					ServiceAccess.ajax({
						type: "PUT",
						data: oCandAssigned,
						url: sPath,
						success: function(data) {
							resolve(data);
						},
						error: function() {
							MessageToast.show("Data retrieval error");
							reject();
						}
					});
				});
			}

		};
	});