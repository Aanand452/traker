select activity_id,
  title,
  campaign_id,
  abstract,
  start_date,
  end_date,
  asset,
  (select name as region from region where a.region_id = region_id),
  (select name as tactic from tactic where a.tactic_id = tactic_id),
  (select name as format from format where a.format_id = format_id),
  (select username from "user" where a.user_id = user_id),
  (select name as program from program where a.program_id = program_id)
from activity a;


create view activities as
select activity_id,
  title,
  campaign_id,
  abstract,
  start_date,
  end_date,
  asset,
  (select name as region from region where a.region_id = region_id),
  (select name as tactic from tactic where a.tactic_id = tactic_id),
  (select name as format from format where a.format_id = format_id),
  (select username from "user" where a.user_id = user_id),
  (select name as program from program where a.program_id = program_id)
from activity a;