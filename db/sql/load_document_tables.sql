truncate table "IACUBE"."CANDIDATES";

insert into "IACUBE"."CANDIDATES"(id,first_name,second_name,gender)
select id,first_name,second_name,gender_name from "SDI_USER"."X2_candidate"

truncate table "IACUBE"."CANDIDATES_PROFILES";
insert into "IACUBE"."CANDIDATES_PROFILES"(candidate_id,profile_id)
select candidate_id,profile_id from "SDI_USER"."X2_candidates_profiles"

truncate table "IACUBE"."EXPERIENCE";
insert into "IACUBE"."EXPERIENCE"(	"PROFILE_ID",	"COMPANY",	"POSITION",	"DESCRIPTION",	"START_YEAR",	"START_MONTH",	"END_YEAR",	"END_MONTH")
select "PROFILE_ID",	"COMPANY",	"POSITION",	"DESCRIPTION",	"START_YEAR",	"START_MONTH",	"END_YEAR",	"END_MONTH" from "SDI_USER"."X2_experience"

truncate table "IACUBE"."PROFILES";
insert into "IACUBE"."PROFILES"("ID",	"EXTERNAL_ID",	"PROFILE_TYPE",	"LINK",	"LANGUAGE",	"HEADLINE",	"SUMMARY")
select "ID",	"EXTERNAL_ID",	"PROFILE_TYPE",	"LINK",	"LANGUAGE",	"HEADLINE",	"SUMMARY" from "SDI_USER"."X2_profiles"

truncate table "IACUBE"."SKILLS";
insert into "IACUBE"."SKILLS"("PROFILE_ID",	"SKILL")
select "PROFILE_ID",	"SKILL" from "SDI_USER"."X2_skills"