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
						Candidates: r.candidates,
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
<<<<<<< HEAD
							CandidateId : c.CandidateId,
							LastName : c.LastName,
							FirstName : c.FirstName,
							Location : c.Location,
							Photo: c.Photo,
							salary: c.salary.map(function(s){
								return{
									CandidateId: s.CandidateId,
									ProfileId: s.ProfileId,
									Salary: s.Salary,
									SalaryCurr: s.SalaryCurr,
									}
							}),
							contacts: c.contacts.map(function(con) 	{
								return{	
									CandidateId: con.CandidateId,
									ContactTypeId: con.ContactTypeId,
									Value: con.Value
									}
							}),
							languages: c.languages.map(function(l){
								return{
									CandidateId: l.CandidateId,
									LanguageId:l.LanguageId,
									LevelId: l.LevelId
									}	
							}),
							
							profiles : c.profiles.map(function(p) {
=======
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
							Text: comm.Text,
							CommentStatusId: comm.StatusId
						}
					}),
					candidates: r.candidates.map(function(c) {
						return {
							CandidateId: c.CandidateId,
							StatusId: c.StatusId,
							CChangedAt: c.ChangedAt,
							FirstName: c.FirstName,
							LastName: c.LastName,
							Experience: c.Experience,
							Distance: c.Distance,
							profiles: c.profiles.map(function(p) {
>>>>>>> branch 'dev' of https://github.com/iacube/iacube.git
								return {
									ExternalId: p.ExternalId,
<<<<<<< HEAD
									ProfileTypeId: p.ProfileTypeId,
									Link: p.Link
								}
							}),
							requisitions : c.requisitions.map(function(r){
								return {
									CandidateId : r.CandidateId,
									ReqId : r.ReqId,
									Title : r.Title,
									StatusId : r.StatusId,
									AssignedBy : r.AssignedBy,
									AssignedAt : r.AssignedAt
								} 
=======
									Link: p.Link,
									ProfileId: p.ProfileId,
									ProfileTypeId: p.ProfileTypeId
								}	
>>>>>>> branch 'dev' of https://github.com/iacube/iacube.git
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
						StatusCodeId: "OPEN",
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
						  CommentId : 10,
						  CommentTypeId : "OTHER",
						  Title : c.CommTitle,
						  Text : c.Text,
						  CommentStatusId: "E",
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