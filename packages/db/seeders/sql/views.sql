create view activities_report as select a.activity_id, a.title, a.campaign_id,
(select name from format where format_id = a.format_id ) format,
a.abstract,
(select name from region where region_id = a.region_id ) region,
a.start_date, a.end_date, a.asset,
(select name from "user" where user_id = a.user_id ) "user",
(select name from program where program_id = a.program_id ) "program",
a.customer_marketing
from activity a