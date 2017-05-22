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
						showCandidatesIcon: r.Candidates > 0 ? true : false
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
							CommCreatedAt: comm.CreatedAt,
							CommCreatedBy: comm.CreatedBy,
							CommTitle: comm.Title,
							Text: comm.Text
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
							Distance: c.Distance	
						}
					})
				}
			}

		};
	});