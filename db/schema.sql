DROP TABLE IF EXISTS incidents;

CREATE TABLE incidents (
  incident_id serial unique primary key,
  incident_type VARCHAR (25) not null,
  incident_date VARCHAR not null,
  horse_name VARCHAR(15),
  incident_desc TEXT not null,
  incident_location VARCHAR not null
);

CREATE INDEX on incidents (incident_type) ;
CREATE INDEX on incidents (incident_location) ;
