import Sequelize from 'sequelize';
import {PostInstance} from '../models/post.interface';

export interface User {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInstance extends User{
    getPosts: Sequelize.HasManyGetAssociationsMixin<PostInstance>;
}

