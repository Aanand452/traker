-- run first the extension
CREATE extension IF NOT EXISTS  "uuid-ossp";

INSERT INTO persona (persona_id, name) VALUES
  (uuid_generate_v4(), 'Admin/Ops'),
  (uuid_generate_v4(), 'All'),
  (uuid_generate_v4(), 'Analytics'),
  (uuid_generate_v4(), 'Digital Marketing '),
  (uuid_generate_v4(), 'Executive'),
  (uuid_generate_v4(), 'Financial Services'),
  (uuid_generate_v4(), 'IT'),
  (uuid_generate_v4(), 'Marketing'),
  (uuid_generate_v4(), 'Not Applicable'),
  (uuid_generate_v4(), 'Platform'),
  (uuid_generate_v4(), 'Sales'),
  (uuid_generate_v4(), 'Service'),
  (uuid_generate_v4(), 'HR/Employees');
