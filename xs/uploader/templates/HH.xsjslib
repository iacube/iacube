var template = {
	procedure:"iacube.db.procedures.HH::update_HH_Resumes",
	parameters:{
        id:{
        	column: "ResumeId",
        	type: "string"
        },
        title:{
        	column :"Title",
        	type : "string"
        },
		last_name:{
			column: "LastName",
			type: "string"
		},
		first_name:{
			column: "FirstName",
			type: "string"
		},
		middle_name:{
			column: "MiddleName",
			type: "string"
		},
		age:{
			column: "Age",
			type: "integer"
		},
		birth_date:{
			column: "BirthDate",
			type: "string"
		},
		gender: {
			id: {
				column: "GenderId",
				type: "string"
			}
		},
		area:{
			name:{
				column:"City",
				type:"string"
			}
		},
		relocation: {
			type: {
			    reduce:{
			        id: {
    					type:"string"
    				}
			    },
			    column:"RelocationId"
			}
		},
		business_trip_readiness:{
			id:{
				column:"BusinessTripId",
				type:"string"
			}
		},
		salary:{
			amount:{
				column:"Salary",
				type:"double"
			},
			currency:{
				column:"SalaryCurr",
				type:"string"
			}
		},
		resume_locale: {
		    reduce:{
    			id:{
    				type:"string"
    			}
		    },
			column:"Language"
		},
		language:{
			level:{
			    reduce:{
			        id:{
    					type:"string"
    				}
			    },
				column:"LevelId"
			},
			id:{
				column:"LanguageId",
				type:"string"
			}
		},
		alternate_url:{
			column:"Link",
			type:"string"
		},
		updated_at:{
			column: "LastChanged",
			type: "timestamp"
		},
		contact: {
            type: {
                reduce:{
                    id: {
                	    type:"string"
                    }
                },
                column:"ContactId"
            },
			value:{
				column:"Value",
            	type:"string"
			}
		},
		site: {
            url: {
            	column:"Value",
            	type:"string"
            },
            type: {
                reduce:{
                    id: {
                    	type:"string"
                    }
                },
                column:"ContactId"
            }
		},
		employments: {
            id: {
            	column:"EmploymentId",
            	type:"string"
            }
        },
		schedules:{
			id:{
				column: "ScheduleId",
				type: "string"
			}
		},
		experience: {
			company : {
				column:"Organization",
				type:"string"
			},
			position: {
				column:"Position",
				type:"string"
			},
			start: {
				column:"StartDate",
				type:"date"
			},
            end: {
            	column:"EndDate",
				type:"string"
            },
            description:{
            	column:"Description",
				type:"string"
            }
	    },
	    skill_set: {
	        asObject :{
        	    column:"Skill",
			    type:"string"
	        }
        },
        photo:{
        	reduce:{
        		40:{
        			type:"string"
        		}
        	},
        	column:"Photo"
        }
		
	},
	getData : function(params,constants){
		//for test
		return params.items;
	},
	transformation: function(data){
	    
	    var transformed = [];
	    var template = {
	        resume      : [],
	        contact     : [],
	        employments : [],
	        experience  : [],
	        schedules   : [],
	        skill_set   : [],
	        language	: []
	    };
	    data.forEach(function(item){

        	["employments","experience","schedules","skill_set","language","contact","site"].forEach(function(entry){
        		if(item[entry]){
        			item[entry].forEach(function(entity){
            	        entity.ResumeId = item.ResumeId;
            	        template[entry].push(entity);
            	    });
                    delete item[entry];
        		}
    	    });
    	    
    	    item.BusinessTripId = item.business_trip_readiness ? item.business_trip_readiness.BusinessTripId : null;
    	    item.RelocationId   = item.relocation ? item.relocation.RelocationId : null;
    	    item.GenderId       = item.gender ? item.gender.GenderId : null;
    	    item.City           = item.area ? item.area.City : null;
    	    
            if(!item.salary){
                item.Salary = null;
                item.SalaryCurr = null;
            }else{
                item.Salary = item.salary.Salary;
                item.SalaryCurr = item.salary.SalaryCurr;
                delete item.salary;
            }
            
    	    delete item.business_trip_readiness;
    	    delete item.relocation;
    	    delete item.gender;
    	    delete item.area;
    	    delete item.language;
    	    
    	    template.resume.push(item);
	    });
        
    	var key;
    	
    	for(key in template){
    	    if(template.hasOwnProperty(key)){
    	        transformed.push(template[key]);
    	    }
    	}
    	
	    return transformed;
	}
};