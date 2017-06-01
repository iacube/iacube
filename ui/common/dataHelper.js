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
			getRequisitions: function(oEvent, oFilter) {
				return new Promise(function(resolve, reject) {
					var sPath = "/iacube/service/requisitions";
					if (oFilter){
						var sFilter = "filter="+ JSON.stringify(oFilter);
						sPath = sPath + "?" + sFilter;
					}
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
			 
			updateRequisitions: function(oRequisition) {
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
			
			getCandidates: function(oEvent, oFilter, sSearchTm, freeParam){
				return new Promise(function(resolve, reject) {
					
					var oParams = [];
					var sPath = "/iacube/service/candidates";
					if(oFilter){
						oParams.push("filter="+ encodeURI(JSON.stringify(oFilter)));
					}
					if(sSearchTm){
						oParams.push("searchTerm="+sSearchTm);
					}
					if(freeParam){
						oParams.push(freeParam);
					}
					var sParams = oParams.join("&");
				ServiceAccess.ajax({
						url: sPath + (sParams ? ("?"+sParams) : ""),
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
			
			getCandidate: function(CandId) {
				return new Promise(function(resolve, reject) {
					var sPath = "/iacube/service/candidate/"+CandId;
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
						data: JSON.stringify(oCandAssigned),
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