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
  (uuid_generate_v4(), 'Sales 2'),
  (uuid_generate_v4(), 'Service 2'),
  (uuid_generate_v4(), 'Commerce 2'),
  (uuid_generate_v4(), 'Marketing 2'),
  (uuid_generate_v4(), 'Analytics 2'),
  (uuid_generate_v4(), 'Premier 2'),
  (uuid_generate_v4(), 'Customer 360 Platform 2'),
  (uuid_generate_v4(), 'Other 2');
