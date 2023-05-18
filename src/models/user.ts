import { Model, Sequelize, DataTypes, Optional } from "sequelize";

export enum Gender {
  Other = "Other",
  Male = "Male",
  Female = "Female"
}

export enum Status {
  Unavailable = "Unavailable",
  Available = "Available",
  Locked = "Locked"
}

export enum Type {
  Administrator = "Administrator",
  Customer = "Customer",
  Shipper = "Shipper"
}

export type UserAttributes = {
  ID: string,
  Username: string,
  FullName: string | null,
  Email: string,
  Gender: Gender,
  Birthday: Date,
  Password: string,
  Salt: string, // Is Used for password hash
  Status: Status,
  Type: Type,
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: Date | null
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'ID' | 'CreatedAt' | 'UpdatedAt' | 'DeletedAt' | 'Gender' | 'Status' | 'Type' | 'Birthday'
>;

export class User extends Model<UserAttributes, UserCreationAttributes>{
  declare ID: string;
  declare Username: string;
  declare FullName: string | null;
  declare Email: string;
  declare Gender: Gender;
  declare Birthday: Date;
  declare Password: string;
  declare Salt: string; // Is Used for password hash
  declare Status: Status;
  declare Type: Type;
  declare CreatedAt: Date;
  declare UpdatedAt: Date;
  declare DeletedAt: Date | null

  public static defineUser(sequelize: Sequelize) {

    if (sequelize.models.User === User) return User;

    this.init({
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      FullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Salt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Gender: {
        type: DataTypes.ENUM(Gender.Other, Gender.Male, Gender.Female),
        defaultValue: Gender.Other
      },
      Birthday: {
        type: DataTypes.DATE,
        allowNull: true
      },
      Status: {
        type: DataTypes.ENUM(Status.Unavailable, Status.Available, Status.Locked),
        defaultValue: Status.Available
      },
      Type: {
        type: DataTypes.ENUM(Type.Administrator, Type.Customer, Type.Shipper),
        defaultValue: Type.Customer
      },

      CreatedAt: DataTypes.DATE,
      UpdatedAt: DataTypes.DATE,
      DeletedAt: DataTypes.DATE
    }, {
      sequelize,
      modelName: 'User',
      timestamps: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
      deletedAt: 'DeletedAt',
    });

    return User;
  }
}