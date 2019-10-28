// src/models/Post.ts
import {Model} from 'sequelize';

export class Post extends Model {
  static postAssociation: any;
  static init(sequelize, DataTypes) {
    return super.init.call(this,{
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.STRING(5000) // extra long length
      },
      category: {
        type: DataTypes.ENUM('tech', 'croissants', 'techno')
      }
    }, {
      tableName: 'posts',
      sequelize: sequelize, // this bit is important
    });
  }

  static associate(models) {
    this.hasMany(models.Comment, { as: 'comments' });
    this.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
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