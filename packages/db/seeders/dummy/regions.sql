-- run first the extension
CREATE extension IF NOT EXISTS  "uuid-ossp";

INSERT INTO region (region_id, name) VALUES
  (uuid_generate_v4(), 'APAC'),
  (uuid_generate_v4(), 'ANZ'),
  (uuid_generate_v4(), 'ASEAN '),
  (uuid_generate_v4(), 'IN '),
  (uuid_generate_v4(), 'GCR');