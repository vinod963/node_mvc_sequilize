// src/models/Comment.ts

import {Model} from 'sequelize';

export class Comment extends Model {
  static commentAssociation: any;
  static init(sequelize, DataTypes) {
    return super.init.call(this,{
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },  
      text: {
        type: DataTypes.STRING(5000) // extra long length
      }  
    }, {
      tableName: 'comments',
      sequelize: sequelize, // this bit is important
    });
  }

  static associate(models) {    
    this.belongsTo(models.Post, { as: 'posts' });
    this.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
    this.belongsToMany(models.User, {
      through: 'PostUpvotes',
      as: 'upvoters'
    });
  }

  static getId(where) {
    return this.findOne({
      where,
      attributes: ["id"],
      order: [["createdAt", "DESC"]]
    });
  }

  // get FullName() {
  //   return `${this.name} ${this.title}`;
  // }
}
