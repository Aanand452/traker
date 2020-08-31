-- run first the extension
create extension if not exists  "uuid-ossp";

--delete from format;
--delete from tactic;
insert into tactic (tactic_id, label) values
  (uuid_generate_v4(), 'Content'),
  (uuid_generate_v4(), 'Digital'),
  (uuid_generate_v4(), 'Exec Engagement'),
  (uuid_generate_v4(), 'Event'),
  (uuid_generate_v4(), 'Webinar'),
  (uuid_generate_v4(), 'Enablement'),
  (uuid_generate_v4(), 'Customer Stories'),
  (uuid_generate_v4(), 'Lead Gen');

insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Blog'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Video'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Demo'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Report'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Infographic'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Podcast'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Research'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'Direct Mail'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Content'), 'eBook');

insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Digital'), 'Paid Social'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Digital'), 'SEM'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Digital'), 'Display'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Digital'), 'Email'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Digital'), 'Organic Social'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Digital'), 'Website');

insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Exec Engagement'), 'Rountable'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Exec Engagement'), 'SIC'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Exec Engagement'), 'Exec Visit');
  
insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Event'), 'Strategic'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Event'), 'Virtual'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Event'), '3rd Party'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Event'), 'Keynote');

insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Webinar'), 'Webinar');

insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Enablement'), 'Enablement');

insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Customer Stories'), 'Films');

insert into format (format_id,tactic_id,label) values
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Lead Gen'), 'Lead Buy'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Lead Gen'), 'Data Purchase'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Lead Gen'), 'Telenurture'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Lead Gen'), 'Email'),
  (uuid_generate_v4(), (select tactic_id from tactic where label = 'Lead Gen'), '3rd Party - Email');