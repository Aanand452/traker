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

insert into format (format_id, name) values
  (uuid_generate_v4(), 'Blog'),
  (uuid_generate_v4(), 'Video'),
  (uuid_generate_v4(), 'Demo'),
  (uuid_generate_v4(), 'Report'),
  (uuid_generate_v4(), 'Infographic'),
  (uuid_generate_v4(), 'Podcast'),
  (uuid_generate_v4(), 'Research'),
  (uuid_generate_v4(), 'Direct Mail'),
  (uuid_generate_v4(), 'eBook');

insert into format (format_id, name) values
  (uuid_generate_v4(), 'Paid Social'),
  (uuid_generate_v4(), 'SEM'),
  (uuid_generate_v4(), 'Display'),
  (uuid_generate_v4(), 'Email'),
  (uuid_generate_v4(), 'Organic Social'),
  (uuid_generate_v4(), 'Website');

insert into format (format_id, name) values
  (uuid_generate_v4(), 'Rountable'),
  (uuid_generate_v4(), 'SIC'),
  (uuid_generate_v4(), 'Exec Visit');
  
insert into format (format_id, name) values
  (uuid_generate_v4(), 'Strategic'),
  (uuid_generate_v4(), 'Virtual'),
  (uuid_generate_v4(), '3rd Party'),
  (uuid_generate_v4(), 'Keynote');

insert into format (format_id, name) values
  (uuid_generate_v4(), 'Webinar');

insert into format (format_id, name) values
  (uuid_generate_v4(), 'Enablement');

insert into format (format_id, name) values
  (uuid_generate_v4(), 'Films');

insert into format (format_id, name) values
  (uuid_generate_v4(), 'Lead Buy'),
  (uuid_generate_v4(), 'Data Purchase'),
  (uuid_generate_v4(), 'Telenurture'),
  (uuid_generate_v4(), 'Email'),
  (uuid_generate_v4(), '3rd Party - Email');

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@salesforce.com', '1234');

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@globant.com', '1234');