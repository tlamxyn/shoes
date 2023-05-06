import { Model, Sequelize, DataTypes, Optional } from "sequelize";

export type UserAttributes = {
  ID: string,
  FirstName: string,
  LastName: string,
  Email: string | null,
  Address: string | null,
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: Date | null
}

export type UserCreationAttributes = Optional<UserAttributes, 'ID'| 'CreatedAt' | 'UpdatedAt'>;


export class User extends Model<UserAttributes, UserCreationAttributes>{
  declare ID: string;
  declare FirstName: string;
  declare LastName: string;
  declare Email: string;
  declare Address: string;
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
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: true
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