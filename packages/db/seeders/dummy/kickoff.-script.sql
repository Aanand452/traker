-- run first the extension
CREATE extension IF NOT EXISTS  "uuid-ossp";

INSERT INTO apm1 (apm1_id, name) VALUES
  (uuid_generate_v4(), 'Sales'),
  (uuid_generate_v4(), 'Service'),
  (uuid_generate_v4(), 'Commerce'),
  (uuid_generate_v4(), 'Marketing'),
  (uuid_generate_v4(), 'Analytics'),
  (uuid_generate_v4(), 'Premier'),
  (uuid_generate_v4(), 'Customer 360 Platform'),
  (uuid_generate_v4(), 'Other');

INSERT INTO apm1 (apm1_id, name) VALUES
  (uuid_generate_v4(), 'Sales'),
  (uuid_generate_v4(), 'Service'),
  (uuid_generate_v4(), 'Commerce'),
  (uuid_generate_v4(), 'Marketing'),
  (uuid_generate_v4(), 'Analytics'),
  (uuid_generate_v4(), 'Premier'),
  (uuid_generate_v4(), 'Customer 360 Platform'),
  (uuid_generate_v4(), 'Other');

INSERT INTO industry (industry_id, name) VALUES
  (uuid_generate_v4(), 'Aerospace & Defense'),
  (uuid_generate_v4(), 'Agriculture & Mining'),
  (uuid_generate_v4(), 'All'),
  (uuid_generate_v4(), 'Automotive'),
  (uuid_generate_v4(), 'Consumer Products & Retail'),
  (uuid_generate_v4(), 'Education'),
  (uuid_generate_v4(), 'Engineering, Construction & RE'),
  (uuid_generate_v4(), 'Financial Services'),
  (uuid_generate_v4(), 'Healthcare & Life Sciences'),
  (uuid_generate_v4(), 'High Tech'),
  (uuid_generate_v4(), 'Manufacturing'),
  (uuid_generate_v4(), 'Media & Communications'),
  (uuid_generate_v4(), 'Other'),
  (uuid_generate_v4(), 'Professional Services'),
  (uuid_generate_v4(), 'Public Sector'),
  (uuid_generate_v4(), 'Travel, Transport & Hospitality');

INSERT INTO "lifecycleStage" (lifecycle_stage_id, name) VALUES
  (uuid_generate_v4(), 'Awareness'),
  (uuid_generate_v4(), 'Advocacy'),
  (uuid_generate_v4(), 'Consideration '),
  (uuid_generate_v4(), 'Decision');

INSERT INTO persona (persona_id, name) VALUES
  (uuid_generate_v4(), 'Admin/Ops'),
  (uuid_generate_v4(), 'All'),
  (uuid_generate_v4(), 'Analytics'),
  (uuid_generate_v4(), 'Digital Marketing '),
  (uuid_generate_v4(), 'Executive'),
  (uuid_generate_v4(), 'Financial Services'),
  (uuid_generate_v4(), 'IT'),
  (uuid_generate_v4(), 'Marketing'),
  (uuid_generate_v4(), 'Not Applicable'),
  (uuid_generate_v4(), 'Platform'),
  (uuid_generate_v4(), 'Sales'),
  (uuid_generate_v4(), 'Service'),
  (uuid_generate_v4(), 'HR/Employees');

INSERT INTO region (region_id, name) VALUES
  (uuid_generate_v4(), 'APAC'),
  (uuid_generate_v4(), 'ANZ'),
  (uuid_generate_v4(), 'ASEAN'),
  (uuid_generate_v4(), 'IN'),
  (uuid_generate_v4(), 'GCR');

INSERT INTO segment (segment_id, name) VALUES
  (uuid_generate_v4(), 'EBU'),
  (uuid_generate_v4(), 'ESB'),
  (uuid_generate_v4(), 'MMGB'),
  (uuid_generate_v4(), 'SMB');

insert into tactic (tactic_id, name) values
  (uuid_generate_v4(), 'Content'),
  (uuid_generate_v4(), 'Digital'),
  (uuid_generate_v4(), 'Exec Engagement'),
  (uuid_generate_v4(), 'Event'),
  (uuid_generate_v4(), 'Webinar'),
  (uuid_generate_v4(), 'Enablement'),
  (uuid_generate_v4(), 'Customer Stories'),
  (uuid_generate_v4(), 'Lead Gen');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Blog'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Video'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Demo'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Report'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Infographic'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Podcast'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Research'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'Direct Mail'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Content'), 'eBook');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Digital'), 'Paid Social'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Digital'), 'SEM'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Digital'), 'Display'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Digital'), 'Email'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Digital'), 'Organic Social'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Digital'), 'Website');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Exec Engagement'), 'Rountable'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Exec Engagement'), 'SIC'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Exec Engagement'), 'Exec Visit');
  
insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Event'), 'Strategic'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Event'), 'Virtual'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Event'), '3rd Party'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Event'), 'Keynote');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Webinar'), 'Webinar');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Enablement'), 'Enablement');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Customer Stories'), 'Films');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Lead Gen'), 'Lead Buy'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Lead Gen'), 'Data Purchase'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Lead Gen'), 'Telenurture'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Lead Gen'), 'Email'),
  (uuid_generate_v4(), (select tactic_id from tactic where name = 'Lead Gen'), '3rd Party - Email');



CREATE FUNCTION get_id(
        IN string_length INTEGER,
        IN possible_chars TEXT DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    ) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    output TEXT = '';
    i INT4;
    pos INT4;
BEGIN
    FOR i IN 1..string_length LOOP
        pos := 1 + CAST( random() * ( LENGTH(possible_chars) - 1) AS INT4 );
        output := output || substr(possible_chars, pos, 1);
    END LOOP;
    RETURN output;
END;
$$;

INSERT INTO program (
  program_id,
  name,
  owner,
  budget, 
  metrics,
  parent_campaign_id,
  target_region,
  lifecycle_stage,
  apm1,
  apm2,
  industry,
  segment,
  persona,
  customer_message,
  business_goal
) VALUES
  (uuid_generate_v4(), 'Salesforce Customer 360', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Moments Made by Marketing ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Moments Made by Marketing IN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'IN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Interaction Studio Demand Gen', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Winning Hearts and Minds of CMOs ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Winning Hearts and Minds of CMOs IN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'IN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Acquire and Connect with Marketing Buyers', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Winning Hearts and Minds of CMOs', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Building Mindshare Amongst Service Buyers', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Service Cloud Voice', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Transform Field Service Management ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Transform Field Service Management ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Transform Field Service Management IN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'IN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Scale Support Through Self Service & Digital Engagement ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Scale Support Through Self Service & Digital Engagement IN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'IN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Scale Support Through Self Service & Digital Engagement IN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'IN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Unlocking Growth Through Employee Experience ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Unlocking Growth Through Employee Experience ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Transform the Customer Experience with Heroku ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Transform the Customer Experience with Heroku ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Protecting Business Data Through Turst & Innovation ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Protecting Business Data Through Turst & Innovation ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'State of Sales', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'State of Sales', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Supporting the Circular Economy', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Streamlining Direct to Consumer', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'CG Resilience Through Ecosystem Agility & VC Transparency', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'SFL Financial Services', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Insurance Back to Growth', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Unlock the Full Power of the Bank', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Industry POV Research Q4 Launch', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Reignite Growth in a Post-COVID World', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Hyperpersonalization Service for Financial Services', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Public Sector Sessions @ SFL: ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'The Trust Imperative - Leadership in the Public Sector', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Streamlining Employee Engagement to Deliver Trusted Government', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Speaking the Language of Our Customers', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Small Business Relief', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Small Business Growth', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Reimagining Your Path to Growth', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Reimagining Your Path to Growth (Essentials) ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Reimagining Your Path to Growth (Essentials) ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Future of Work in Small Business', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Startup Engagement', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Reignite Growth in a Post-COVID World', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Empowering Emerging Industries to Transform Digitally', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Growing Pipeline (75% NLs) with Customer 360 Vision', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Personalised Journeys for Strategic Customers (1:Few ABM)', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Helping IAG Get to the Future Faster', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'CXO Acquisition ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'CXO Acquisition ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'CXO Nurture & Discussion ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'CXO Nurture & Discussion ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Persona: CXO ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Persona: CXO ASEAN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ASEAN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'HQ Executive Visits', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'HQ Executive Visits', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'HQ Executive Visits', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'SIC Briefing + Exec Connects', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'SIC Briefing + Exec Connects', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'SIC Briefing + Exec Connects', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Work.com ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Work.com IN', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'IN'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Values-Led Awareness', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Salesforce Live: Asia', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Salesforce Live: Asia', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Salesforce Live: India', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region ORDER BY RANDOM() LIMIT 1), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Salesforce Live: ANZ', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'ANZ'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Dreamforce in APAC', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'APAC'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Dreamforce in APAC', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'APAC'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Dreamforce in APAC', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'APAC'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL),
  (uuid_generate_v4(), 'Dreamforce in APAC', 'millergonzalez@salesforce.com', (SELECT FLOOR(RANDOM()*(99999999-10000+1))+10000), NULL, (SELECT(get_id(18))), (SELECT region_id FROM region WHERE name = 'APAC'), (SELECT lifecycle_stage_id FROM "lifecycleStage" ORDER BY RANDOM() LIMIT 1), (SELECT apm1_id FROM apm1 ORDER BY RANDOM() LIMIT 1), NULL, (SELECT industry_id FROM industry ORDER BY RANDOM() LIMIT 1), (SELECT segment_id FROM segment ORDER BY RANDOM() LIMIT 1), (SELECT persona_id FROM persona ORDER BY RANDOM() LIMIT 1), NULL, NULL);
  

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@salesforce.com', '1234');

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@globant.com', '1234');