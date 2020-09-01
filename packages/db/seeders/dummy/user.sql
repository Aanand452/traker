insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@salesforce.com', '1234');

insert into "user" (user_id, username, password) values
(uuid_generate_v4(), 'miller.gonzalez@globant.com', '1234');


insert into program_user (program_user_id, program_id, user_id) values
(uuid_generate_v4(), (select program.program_id from program where program.name = 'Interaction Studio Demand Gen' limit 1),  (select user_id from "user" as usr where username = 'miller.gonzalez@salesforce.com' limit 1)),
(uuid_generate_v4(), (select program.program_id from program where program.name = 'Moments Made by Marketing IN' limit 1),  (select user_id from "user" as usr where username = 'miller.gonzalez@salesforce.com' limit 1)) ,
(uuid_generate_v4(), (select program.program_id from program where program.name = 'Acquire and Connect with Marketing Buyers' limit 1),  (select user_id from "user" as usr where username = 'miller.gonzalez@salesforce.com' limit 1)) ;


insert into program_user (program_user_id, program_id, user_id) values
(uuid_generate_v4(), (select program.program_id from program where program.name = 'Interaction Studio Demand Gen' limit 1),  (select user_id from "user" as usr where username = 'miller.gonzalez@globant.com' limit 1)),
(uuid_generate_v4(), (select program.program_id from program where program.name = 'Moments Made by Marketing IN' limit 1),  (select user_id from "user" as usr where username = 'miller.gonzalez@globant.com' limit 1)) ;