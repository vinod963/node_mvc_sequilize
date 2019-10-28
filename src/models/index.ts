import {Sequelize,DataTypes} from 'sequelize';
import {Post} from './Post';
import {Comment}  from './Comment';
import {User}  from './User';

export const createModels = (sequelizeConfig: any) => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const models = {
    Comment: Comment.init(sequelize, Sequelize),
    Post: Post.init(sequelize, Sequelize),    
    User: User.init(sequelize, Sequelize)
  };

  // Run `.associate` if it exists,
  // ie create relationships in the ORM
  Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

  const db = { ...models, sequelize };

  return db;
  
  
};
