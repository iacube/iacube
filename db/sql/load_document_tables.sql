truncate table "IACUBE"."iacube.db::tables.Candidate.Candidates";

insert into "IACUBE"."iacube.db::tables.Candidate.Candidates"("CandidateId","FirstName","LastName","GenderId")
select id,first_name,second_name,gender from "IACUBE"."CANDIDATES"

truncate table "IACUBE"."iacube.db::tables.Candidate.Profiles"
insert into "IACUBE"."iacube.db::tables.Candidate.Profiles"("CandidateId","ProfileId") 
select candidate_id,profile_id from "IACUBE"."CANDIDATES_PROFILES";

truncate table "IACUBE"."iacube.db::tables.Profile.Experience";

insert into "IACUBE"."iacube.db::tables.Profile.Experience"("ProfileId","Company","Position","Description","StartDate","EndDate")

select "PROFILE_ID",	"COMPANY",	"POSITION",	"DESCRIPTION",	TO_DATE(TO_VARCHAR("START_YEAR")||'-'||TO_VARCHAR("START_MONTH")||'-01'),
       TO_DATE(TO_VARCHAR("END_YEAR")||'-'||TO_VARCHAR("END_MONTH")||'-01') from "IACUBE"."EXPERIENCE"

truncate table "IACUBE"."iacube.db::tables.Profile.Profiles";

insert into "IACUBE"."iacube.db::tables.Profile.Profiles"("ProfileId","ExternalId","ProfileTypeId","Link","Headline","Summary")
select "ID",	"EXTERNAL_ID",0,"LINK","HEADLINE","SUMMARY" from "IACUBE"."PROFILES"

truncate table "IACUBE"."iacube.db::tables.Profile.Skills";

insert into "IACUBE"."iacube.db::tables.Profile.Skills"("ProfileId","Skill")

select "PROFILE_ID","SKILL" from "IACUBE"."SKILLS"