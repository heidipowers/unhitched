DROP TABLE IF EXISTS incidents;

CREATE TABLE incidents (
  incident_id serial unique primary key,
  incident_type VARCHAR (25) not null,
  incident_month VARCHAR (15) not null,
  incident_year INT not null,
  horse_name VARCHAR(15),
  incident_desc TEXT not null,
  incident_location VARCHAR not null,
  incident_lat DECIMAL not null,
  incident_lng DECIMAL not null,
  fatal BOOLEAN DEFAULT FALSE
);

CREATE INDEX on incidents (incident_year);
CREATE INDEX on incidents (incident_month);
CREATE INDEX on incidents (incident_type) ;
CREATE INDEX on incidents (incident_location) ;
