CREATE extension IF NOT EXISTS  "uuid-ossp";
CREATE OR REPLACE FUNCTION transferData() RETURNS SETOF program AS
$BODY$
DECLARE
    p program%rowtype;
BEGIN
  FOR p IN
    SELECT * FROM program
  LOOP
    INSERT INTO program_lifecycle (program_lifecycle_id, program_id, lifecycle_id) SELECT uuid_generate_v4(), p.program_id, p.lifecycle_stage WHERE p.lifecycle_stage IS NOT NULL;
    INSERT INTO program_apm1 (program_apm1_id, program_id, apm1_id) SELECT uuid_generate_v4(), p.program_id, p.apm1 WHERE p.apm1 IS NOT NULL;
    INSERT INTO program_apm2 (program_apm2_id, program_id, apm2_id) SELECT uuid_generate_v4(), p.program_id, p.apm2 WHERE p.apm2 IS NOT NULL;
    INSERT INTO program_industry (program_industry_id, program_id, industry_id) SELECT uuid_generate_v4(), p.program_id, p.industry WHERE p.industry IS NOT NULL;
    INSERT INTO program_segment (program_segment_id, program_id, segment_id) SELECT uuid_generate_v4(), p.program_id, p.segment WHERE p.segment IS NOT NULL;
    INSERT INTO program_persona (program_persona_id, program_id, persona_id) SELECT uuid_generate_v4(), p.program_id, p.persona WHERE p.persona IS NOT NULL;

    RETURN NEXT p;
  END LOOP;
  RETURN;
END
$BODY$
LANGUAGE plpgsql;

SELECT * FROM transferData();