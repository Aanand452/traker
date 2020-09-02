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