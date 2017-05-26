sap.ui.define([
		"sap/m/MessageToast",
		"iacube/ui/common/serviceAccess"
	],
	function(MessageToast, ServiceAccess) {
		"use strict";
		return {

			mapRequisitions: function(aRequisitions) {
				return aRequisitions.map(function(r){
					return {
						ReqId: r.ReqId,
						Title: r.Title,
						ProjectId: r.ProjectId,
						PriorityId: r.PriorityId,
						Location: r.Location,
						StatusCodeId: r.StatusCodeId,
						SubcategoryName: r.SubcategoryName,
						CreatedBy: r.CreatedBy,
						CreatedAt: new Date(r.CreatedAt),
						candidates: r.candidates.map(function(c){
							return {
								AssignedAt: new Date(c.AssignedAt),
								AssignedBy: c.AssignedBy,
								CandidateId: c.CandidateId,
								FirstName: c.FirstName,
								LastName: c.LastName,
								ReqId: c.ReqId,
								StatusId: c.StatusId
							}
						}),
					}
				})
			},
			
			mapRequisition: function(r) {
				return {
					ReqId: r.ReqId,
					Title: r.Title,
					ProjectId: r.ProjectId,
					PriorityId: r.PriorityId,
					Location: r.Location,
					StatusCodeId: r.StatusCodeId,
					SubcategoryId: r.SubcategoryId,
					SubcategoryName: r.SubcategoryName,
					CreatedBy: r.CreatedBy,
					CreatedAt: new Date(r.CreatedAt),
					Language: r.Language,
					Keywords: r.Keywords,
					Description: r.Description,
					skills: r.skills.map(function(s) {
						return {
							Skill: s.Skill,
							Weight: s.Weight
						}
					}),
					comments: r.comments.map(function(comm) {
						return {
							CommentId: comm.CommentId,
							CommentTypeId: comm.CommentTypeId,
							CommCreatedAt: new Date(comm.CreatedAt),
							CommCreatedBy: comm.CreatedBy,
							CommTitle: comm.Title,
							Text: comm.Text
						}
					}),
					candidates: r.candidates.map(function(c) {
						return {
							CandidateId: c.CandidateId,
							StatusId: c.StatusId,
							ChangedAt: new Date(c.ChangedAt),
							FirstName: c.FirstName,
							LastName: c.LastName,
							Experience: c.Experience,
							Distance: c.Distance,
							profiles: c.profiles.map(function(p) {
								return {
									ExternalId: p.ExternalId,
									Link: p.Link,
									ProfileId: p.ProfileId,
									ProfileTypeId: p.ProfileTypeId
								}	
							})
						}
					})
				}
			},
			
			composeRequisitionForCreate: function(oReq){
				return JSON.stringify({
						
					requisitions:[{
						ReqId: 100,
						Title: oReq.Title,
						ProjectId: oReq.ProjectId,
						PriorityId: oReq.PriorityId,
						Location: oReq.Location,
						StatusCodeId: oReq.StatusCodeId,
						SubcategoryId: oReq.SubcategoryId,
						Language: oReq.Language,
						Keywords: oReq.Keywords,
						Description: oReq.Description,
						flag: "I"
					}],
					skills: oReq.skills.map(function(s){
						return {
							ReqId: 100,
							Skill: s.Skill,
							Weight: s.Weight,
							flag: "I"
						}
					}),
					comments: oReq.comments.map(function(c){
						return {
						  ReqId : 100,
						  CommentId : 0,
						  CommentTypeId : "OTHER",
						  Title : c.CommTitle,
						  Text : c.Text,
						  flag:"I" 
						}
					})
				})
			},
			
			mapCandidates: function(aCandidates) {
				return aCandidates.map(function(r){
					return {
						CandidateId: r.CandidateId,
						LastName: r.LastName,
						FirstName: r.FirstName,
						Location: r.Location,
						salary: [ ],
						profiles: r.profiles.map(function(p){
							return {
								ExternalId: p.ExternalId,
								ProfileTypeId: p.ProfileTypeId,
								Link: p.Link
							}
						}),//дописать MAP
						requisitions: [
							{
								CandidateId: 1,
								ReqId: 7788,
								Title: "SAP ABAP Developer",
								StatusId: "APPROVED",
								AssignedBy: "Cartman",
								AssignedAt: "2017-02-23T01:00:00.000Z"
							}
						]
					}
				})
			},

		};
	});