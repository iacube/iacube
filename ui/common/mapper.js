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
							CChangedAt: c.ChangedAt,
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
			mapCandidate: function(c) {
				return {
					CandidateId: c.CandidateId,
					LastName: c.LastName,
					FirstName: c.FirstName,
					MiddleName: c.MiddleName,
					BirthDate: c.BirthDate,
					GenderId: c.GenderId,
					Location: c.Location,
					ProfArea: c.ProfArea,
					contacts: c.contacts.map(function(con) 	{
						return{	
							ContactTypeId: con.ContactTypeId,
							Value: con.Value
							}
					}),
					languages: c.languages.map(function(l){
						return{
							LanguageId:l.LanguageId,
							LevelId: l.LevelId
						}
					}),
					
					profiles: c.profiles.map(function(p) {
						return {
							ProfileId: p.ProfileId,
							ExternalId: p.ExternalId,
							ProfileTypeId: p.ProfileTypeId,
							Link: p.Link,
							Headline: p.Headline,
							Summary: p.Summary,
							DesiredPosition:p.DesiredPosition,
							Salary: p.Salary,
							SalaryCurr: p.SalaryCurr,
							RelocationId: p.RelocationId,
							BusinessTripId: p.BusinessTripId,
							experience: p.experience.map(function(e){
								return{
									Company:e.Company,
									Position:e.Position,
									Description:e.Description,
									StartDate: e.StartDate,
									EndDate: e.EndDate
								}
								
							}),
							schedules: p.schedules.map(function(sc){
								return{
									ScheduleId: sc.ScheduleId
								}
							}),
							skills: p.skills.map(function(sk) {
								return{
									ProfileId:sk.ProfileId,
									Skill: sk.Skill
								}
							})
							
						}	
					})
				}
			},
			mapCandidates: function(aCandidates){
				return aCandidates.map(function(c){
					return{
						CandidateId: c.CandidateId,
						LastName: c.LastName,
						FirstName: c.FirstName,
						Location: c.Location,
						ProfArea: c.ProfArea,
						profiles: c.profiles.map(function(p) {
							return {
								CandidateId: p.CandidateId,
								ProfileId: p.ProfileId,
								ExternalId: p.ExternalId,
								ProfileTypeId: p.ProfileTypeId,
								Link: p.Link
							}
						}),
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
						
					}
				})
					
			}
				
		}
		
	});