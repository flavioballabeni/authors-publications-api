# authors-publications-api

A [Sails](http://sailsjs.org) application

###  Dev dependencies:
[Prettier](https://github.com/prettier/prettier): We use Prettier to automatically format code.
[Postgres](https://www.postgresql.org/): PostgreSQL database
[Redis](https://redis.io/): Redis is used to manage token sessions.

###  Scripts in package.json:

 **Script** | **Description** |
|----------|-------|
| precommit | lint-staged: runs Prettier |
| postinstall | Runs migrations |
| debug | Runs the app in debug mode |
| start | starts the app |
| test  | Runs the tests |
| dev   | Runs the app with nodemon |


###  Development:

For the app to run properly we need to set the version ^8 of node (command: nvm use v8)
This needs to be set before running the install command (yarn install)
All new libraries have to be added with yarn (yarn add XXXX)

Create file config/local.js with the database connection information.
this is an example local.js file:
```
module.exports = {

   datastores: {
    default: {
      url: 'postgres://username:password@host:port/database_name'
    }
   }
};
```
There is a script to add all the automatic emails & their subject. To add them, include the ENV variable RUN_SETTINGS_SEEDERS (after running the app please remove this variable)

###  Migrations:
[node-pg-migrate](https://github.com/theoephraim/node-pg-migrate)
npm install node-pg-migrate
./node_modules/.bin/pg-migrate

###  Seeding:
To automatically run seeds on application boostrap, create an ENV variable called:
 "RUN_SEEDERS"
If this variable is set, the seed process will run on application boostrap.

##### Configuration
You could specify your database url by setting the environment variable DATABASE_URL.
DATABASE_URL=postgres://postgres@localhost/name node-pg-migrate

On localhost, create a default.json file on the config directory with the following content:
```
{
  "db": {
    "user": USER_NAME,
    "password": PASS,
    "host": "localhost",
    "port": 5432,
    "name": DATABASE NAME
  }
}
```

##### Column Definitions

The createTable and addColumns methods both take a columns argument that specifies column names and options. It is a object (key/value) where each key is the name of the column, and the value is another object that defines the options for the column.

type [string] - data type (use normal postgres types)
unique [boolean] - set to true to add a unique constraint on this column
primaryKey [boolean] - set to true to make this column the primary key
notNull [boolean] - set to true to make this column not null
check [string] - sql for a check constraint for this column
references [string] - a table name that this column is a foreign key to
onDelete [string] - adds ON DELETE constraint for a reference column
onUpdate [string] - adds ON UPDATE constraint for a reference column

There is a shorthand to pass only the type instead of an options object: pgm.addColumns('myTable', { age: 'integer' }); is equivalent to pgm.addColumns('myTable', { age: { type: 'integer' } });

There is a shorthand for normal auto-increment IDs: pgm.addColumns('myTable', { id: 'id' }); is equivalent to pgm.addColumns('myTable', { id: { type: 'serial', primaryKey: true } });

###  Testing
#### Libraries:
- [mocha](https://mochajs.org/)
- [should](https://shouldjs.github.io/)
- [supertest](https://github.com/visionmedia/supertest)
- [barrels](https://github.com/bredikhin/barrels) - For database fixture loading
NOTE: barrels does not support waterline v1 so we needed to port it. The new version is under test/utils/barrels.js

Assertion library: https://shouldjs.github.io/

#### Configuration
Create a Postgresql database named "ap_test_db"

Add this property to the config/local.js file:
```
  test: {
      adapter: require('sails-postgresql'),
      url: 'postgres://postgres:password@localhost:5432/ap_test_db'
  }
```


In order to run migrations before running the tests, create a config/test.json file with the follwing content:
```
{
  "db": {
    "user": USER_NAME,
    "password": PASS,
    "host": "localhost",
    "port": 5432,
    "name": "ap_test_db"
  }
}
```
*The test database must be named pm_test_db*

###  Other ENV variables
You can create .env file with all environmental variables.

- RUN_SEEDERS=true;
- REDISTOGO_URL=redis://redis:6379
- DATABASE_URL="postgres://ap_dev_us:123456@db/ap_dev_db"

##  About Dates and the ORM

The adapter sails-postgresql v1.0.0-10, has some limitations dealing with dates.

During a discussion on the support forum, this came up:
w/ v1 I was having a lot of trouble with dates, too - wound up just going w/ just epoch ms - not super happy w/ that choice, as we're using mysql and that basically throws out all mysql date functions (unless you do some fun transformations w/ to_seconds(), etc), but, I found I didn't really hit any challenges changing how our project uses moment.js to work w/ epoch ms vs. mysql datetime format

What about queries? => will need to review - that actually may have been the final straw when queries weren't working w/ type: ref, I just turned to the epoch ms - don't quote me on that, but that sounds familiar

@gotmikhail that's a good point about the unixtimes... they will work out of the box for queries and sorting (if you are converting from string before query)


The creator of the framework suggest:
 if it's a timestamp, I strongly recommend type: 'number' + bigint column type. If you need to be able to localize that timestamp to a particular physical location (e.g. a volleyball tournament occurring in Kansas, CDT), then also keep track of the timezone identifier (e.g. "America/Chicago") as a separate string attribute. As a convention, we like to use fooBarredAt (something that ends in "At") for the timestamp, and timezone for the timezone (with a more specific prefix if there are multiple)
If it's something like a recurring calendar event with the day of the week (e.g. first thursday of every month), then you'll want to come up with a different approach
same thing for e.g. something vaguer that doesn't depend on timezone, like a particular month (e.g. you might use a string attribute and store something like 2017-04
(^^that'll work for the next ~8,000 years anyway)
