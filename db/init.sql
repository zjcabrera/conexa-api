CREATE DATABASE conexaapidb;
CREATE USER templateuser WITH ENCRYPTED PASSWORD 'secret1234';
GRANT ALL PRIVILEGES ON DATABASE conexaapidb TO templateuser;
ALTER USER templateuser WITH SUPERUSER;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";