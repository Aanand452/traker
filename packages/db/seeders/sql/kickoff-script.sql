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

INSERT INTO apm2 (apm2_id, name) VALUES
  (uuid_generate_v4(), 'Sales 2'),
  (uuid_generate_v4(), 'Service 2'),
  (uuid_generate_v4(), 'Commerce 2'),
  (uuid_generate_v4(), 'Marketing 2'),
  (uuid_generate_v4(), 'Analytics 2'),
  (uuid_generate_v4(), 'Premier 2'),
  (uuid_generate_v4(), 'Customer 360 Platform 2'),
  (uuid_generate_v4(), 'Other 2');

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

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@salesforce.com', '1234');

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@globant.com', '1234');