// src/models/User.ts
import {Model} from 'sequelize';

export class User extends Model {
  static init(sequelize, DataTypes) {    
    return super.init.call(this,{
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        validate: {
          len: {
            args: [3, 100],
            msg: "Name address must be between 3 and 60 characters in length"
          }
        }
      }      
    }, {
      tableName: 'users',
      sequelize: sequelize, // this bit is important
    });
  }

  static associate(models) {
    this.hasMany(models.Comment, { foreignKey: 'AuthorId', as: 'comments' });
    this.hasMany(models.Post, { foreignKey: 'AuthorId', as: 'posts' });
    this.belongsToMany(models.Comment, {
      through: 'PostUpvotes',
      as: 'upvotedComments'
    });
  }

  static getId(where) {
    return this.findOne({
      where,
      attributes: ["id"],
      order: [["createdAt", "DESC"]]
    });
  }

  public name:string;
  getFullName() {
    return `${this.name}`;
  };
}