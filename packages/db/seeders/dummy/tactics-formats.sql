-- run first the extension
create extension if not exists  "uuid-ossp";

--delete from format;
--delete from tactic;
insert into tactic (tactic_id, name) values
  (uuid_generate_v4(), 'Content'),
  (uuid_generate_v4(), 'Digital'),
  (uuid_generate_v4(), 'Exec Engagement'),
  (uuid_generate_v4(), 'Event'),
  (uuid_generate_v4(), 'Webinar'),
  (uuid_generate_v4(), 'Enablement'),
  (uuid_generate_v4(), 'Customer Stories'),
  (uuid_generate_v4(), 'Lead Gen');

insert into format (format_id,name,tactic_id) values
  (uuid_generate_v4(), 'Blog', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'Video', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'Demo', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'Report', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'Infographic', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'Podcast', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'Research', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'Direct Mail', (select tactic_id from tactic where name = 'Content')),
  (uuid_generate_v4(), 'eBook', (select tactic_id from tactic where name = 'Content'));

insert into format (format_id,name,tactic_id) values
  (uuid_generate_v4(), 'Paid Social', (select tactic_id from tactic where name = 'Digital')),
  (uuid_generate_v4(), 'SEM', (select tactic_id from tactic where name = 'Digital')),
  (uuid_generate_v4(), 'Display', (select tactic_id from tactic where name = 'Digital')),
  (uuid_generate_v4(), 'Email', (select tactic_id from tactic where name = 'Digital')),
  (uuid_generate_v4(), 'Organic Social', (select tactic_id from tactic where name = 'Digital')),
  (uuid_generate_v4(), 'Website', (select tactic_id from tactic where name = 'Digital'));

insert into format (format_id,name,tactic_id) values
  (uuid_generate_v4(), 'Rountable', (select tactic_id from tactic where name = 'Exec Engagement')),
  (uuid_generate_v4(), 'SIC', (select tactic_id from tactic where name = 'Exec Engagement')),
  (uuid_generate_v4(), 'Exec Visit', (select tactic_id from tactic where name = 'Exec Engagement'));

                                                     

