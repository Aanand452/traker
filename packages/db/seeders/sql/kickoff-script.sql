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
  (uuid_generate_v4(), 'Sales Cloud & Industries'),
  (uuid_generate_v4(), 'Salesforce CPQ'),
  (uuid_generate_v4(), 'Partner Relationship Management (PRM)'),
  (uuid_generate_v4(), 'Salesforce Maps'),
  (uuid_generate_v4(), 'Salesforce Essentials'),
  (uuid_generate_v4(), 'Data.com'),
  (uuid_generate_v4(), 'Service Clcoud & Industries'),
  (uuid_generate_v4(), 'Field Service'),
  (uuid_generate_v4(), 'Self Service'),
  (uuid_generate_v4(), 'Digital Service'),
  (uuid_generate_v4(), 'B2C Commerce'),
  (uuid_generate_v4(), 'B2B Commerce'),
  (uuid_generate_v4(), 'Messaging/Journeys'),
  (uuid_generate_v4(), 'Pardot'),
  (uuid_generate_v4(), 'Datorama'),
  (uuid_generate_v4(), 'Social Studio'),
  (uuid_generate_v4(), 'Audience & Data Studio'),
  (uuid_generate_v4(), 'Interaction Studio'),
  (uuid_generate_v4(), 'Advertising Studio'),
  (uuid_generate_v4(), 'Core Platform'),
  (uuid_generate_v4(), 'Heroku'),
  (uuid_generate_v4(), 'ISV/App Exchange'),
  (uuid_generate_v4(), 'Shield'),
  (uuid_generate_v4(), 'Platform Services'),
  (uuid_generate_v4(), 'myTrailhead'),
  (uuid_generate_v4(), 'Quip'),
  (uuid_generate_v4(), 'Tableau'),
  (uuid_generate_v4(), 'Einstein Analytics'),
  (uuid_generate_v4(), 'Premier A la Carte & Priority - Sales, Service, Platform'),
  (uuid_generate_v4(), 'Mulesoft Anypoint Platform');

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
  (uuid_generate_v4(), 'INDIA'),
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
  (uuid_generate_v4(), null, 'Blog'),
  (uuid_generate_v4(), null, 'Video'),
  (uuid_generate_v4(), null, 'Demo'),
  (uuid_generate_v4(), null, 'Report'),
  (uuid_generate_v4(), null, 'Infographic'),
  (uuid_generate_v4(), null, 'Podcast'),
  (uuid_generate_v4(), null, 'Research'),
  (uuid_generate_v4(), null, 'Direct Mail'),
  (uuid_generate_v4(), null, 'eBook');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), null, 'Paid Social'),
  (uuid_generate_v4(), null, 'SEM'),
  (uuid_generate_v4(), null, 'Display'),
  (uuid_generate_v4(), null, 'Email'),
  (uuid_generate_v4(), null, 'Organic Social'),
  (uuid_generate_v4(), null, 'Website');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), null, 'Rountable'),
  (uuid_generate_v4(), null, 'SIC'),
  (uuid_generate_v4(), null, 'Exec Visit');
  
insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), null, 'Strategic'),
  (uuid_generate_v4(), null, 'Virtual'),
  (uuid_generate_v4(), null, '3rd Party'),
  (uuid_generate_v4(), null, 'Keynote');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), null, 'Webinar');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), null, 'Enablement');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), null, 'Films');

insert into format (format_id,tactic_id,name) values
  (uuid_generate_v4(), null, 'Lead Buy'),
  (uuid_generate_v4(), null, 'Data Purchase'),
  (uuid_generate_v4(), null, 'Telenurture'),
  (uuid_generate_v4(), null, 'Email'),
  (uuid_generate_v4(), null, '3rd Party - Email');

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@salesforce.com', '1234');

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@globant.com', '1234');