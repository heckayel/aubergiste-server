### create the database

Install prostgres

Connect to postgres and create the user with priveleges and the database

``` postgresql
postgres=# create database aubergiste;
CREATE DATABASE
postgres=# create user aubergiste with encrypted password '<password>';
CREATE ROLE
postgres=# grant all privileges on database aubergiste to aubergiste;
```

### Environment

Copy .env-dist in .env

Complete the following configs in the .env : 

Admin  is the default admin of the application 
DB are the db configuration
Discord are the configs to connect to discord

```
# ADMIN
user=
password=
email=
salt=

DB_DATABASE_NAME=
DB_USERNAME=
DB_PASSWORD=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_TOKEN=
```

### Generate admin and roles
Go on the urls : (3022 is the port but care if you change it in config to change it when you go on the url)

http://localhost:3022/generate-roles
http://localhost:3022/generate-admin
