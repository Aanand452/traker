-- run first the extension
create extension if not exists  "uuid-ossp";

insert into program (program_id, label, owner) values
  (uuid_generate_v4(), 'Salesforce Customer 360', 'miller.gonzalez@salesforce.com'),
  (uuid_generate_v4(), 'Moments Made by Marketing ANZ', 'miller.gonzalez@salesforce.com'),
  (uuid_generate_v4(), 'Moments Made by Marketing IN', 'miller.gonzalez@salesforce.com'),
  (uuid_generate_v4(), 'Interaction Studio Demand Gen', 'miller.gonzalez@salesforce.com'),
  (uuid_generate_v4(), 'Winning Hearts and Minds of CMOs ASEAN', 'miller.gonzalez@salesforce.com'),
  (uuid_generate_v4(), 'Winning Hearts and Minds of CMOs IN', 'miller.gonzalez@salesforce.com'),
  (uuid_generate_v4(), 'Acquire and Connect with Marketing Buyers', 'miller.gonzalez@salesforce.com');
  