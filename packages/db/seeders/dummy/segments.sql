-- run first the extension
CREATE extension IF NOT EXISTS  "uuid-ossp";

INSERT INTO segment (segment_id, name) VALUES
  (uuid_generate_v4(), 'EBU'),
  (uuid_generate_v4(), 'ESB'),
  (uuid_generate_v4(), 'MMGB'),
  (uuid_generate_v4(), 'SMB');