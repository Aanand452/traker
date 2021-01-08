-- activities report v1 non truncated dates
create view activities_report as select a.activity_id, a.title, a.campaign_id,
(select name from format where format_id = a.format_id ) format,
a.abstract,
(select name from region where region_id = a.region_id ) region,
a.start_date, a.end_date, a.asset,
(select name from "user" where user_id = a.user_id ) "user",
(select name from program where program_id = a.program_id ) "program",
a.customer_marketing
from activity a


-- activities report v2 truncated dates
create view activities_report as select a.activity_id, a.title, a.campaign_id,
(select name from format where format_id = a.format_id ) format,
a.abstract,
(select name from region where region_id = a.region_id ) region,
date_trunc('day',a.start_date) start_date,
date_trunc('day',a.end_date) end_date,
a.asset,
(select name from "user" where user_id = a.user_id ) "user",
(select name from program where program_id = a.program_id ) "program",
a.customer_marketing
from activity a;

-- program log report
create view program_log_report as
select
  pl.program_id,
  (select name from program where program_id = pl.program_id ) "program name",
  (select name from "user" where user_id = pl.user_id ) "user name",
  pl.method,
  pl.change,
  date_trunc('day', pl.change_date) "change date"
from program_logs pl;

-- activity logs report
CREATE VIEW activity_logs_report AS SELECT
  a.activity_id,
  (SELECT title FROM activity WHERE activity_id = a.activity_id LIMIT 1) "activity title",
  (SELECT name FROM "user" WHERE user_id = a.user_id LIMIT 1) "user name",
  a.method,
  a.change,
  date_trunc('day', a.change_date) "change date"
FROM activity_logs a;

-- program report v1
create view program_report as select
  p.program_id,
  p.name,
  p.owner,
  p.budget,
  p.metrics,
  p.customer_message,
  (select name from region where region_id = p.target_region ) region,
  p.other_kpis,
  ('FY' || substr('' || p.year_quarter, 1, 4) || 'Q' || substr('' || p.year_quarter, 5, 1))
from program p;
