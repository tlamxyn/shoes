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
