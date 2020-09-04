-- activity insert example
insert into activity (activity_id, title, campaign_id, tactic_id, format_id, abstract, region_id,start_date, end_date, asset, user_id, program_id) values
(uuid_generate_v4(), 'test miller', 'campaign', 'addd6550-13fb-4cd7-9c02-bcdf418a5d5d',
 '188d19c6-e298-4bf6-a722-91b720f919af', 'test abstract', '1e98ad6b-39fa-415f-b90a-aa6e675b7d5c',
 '1/1/2020', '2/1/2020', 'test asset','cb2d1b37-1e80-490c-ac69-60b8f1435582', '891364c0-9846-4926-8d5e-c098deed9a5b' );
