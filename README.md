## Database

`MySQL` class is set for easily working with database

static argument `MySQL.sequelize` will automatically be initiated after call `MySQL.init` static method

Always remember to close database by using `MySQL.sequelize.close`

In this app, initiating and closing database is done by using `ShoesManager` Event Emitter

## ShoesManager (beta)

`ShoesManager` is extend of `EventEmitter` class

It's used to controll actions when this app start or quit (suppose to be)

## Migration

Use command below to terminal.

```
yarn console migrate
```

Some more arguments: `--force` and `--alter`.

By default, `--force=false` and `--alter=false`.

It can be chosen to write down or not.

For example, with `yarn console migrate --force=true`, mysql database will be drop if it exists and replaced by the new one.

While with `yarn console migrate --alter=true`, the mysql database will be kept and changed base on model

So `yarn console migrate --alter=true --force=true` can be valid

## Seed

Use command below to terminal

```
yarn console seed
```

To change records of each table that will be seeded, go to files in folder `seeders\seed`

## Account

### 1. Register
In this project, just Customers can register accounts for themself.

Admin and Shipper is special. They must have an account that is created by Great Admin.
Or at least, having an account started from Customer is needed to upgrade to Admin or Shipper's Permission

### 2. Login and Logout

Customer, Admin and Shipper use this API together

There are 2 middleware to check if user is really existed and it has permissions to access coresponding API

### 3. Verify Email

Customer, Admin and Shipper use this API together

## Validate Request

There are two class used for validate input:
 - ValidateCollector
 - ValidateWorker

 See more at Valiate middleware

### 1. ValidateWorker
 ValidateWorker is used for validating input by using schema.
 It's neccessary to init it first in startup file (index.ts) like so:
 ```
 ValidateWorker.init()
 ```

Then we can use it like this:
```
const input = req.body.input
const result = ValidateWorker.ajv.validate(schema, input)
if(result) {
    next()
}
return req.status(400).end()
```

### 2. ValidateCollector

Used for collect all neccessary parameters from req.query, req.params, req.body.

example: We want to update producttype, we need it's ID and Name. But 
they are all in different place to get easily. ID in req.params, but Name in req.body

For using this class, create an object of it, and then use `collectData` method to get
all what you will need