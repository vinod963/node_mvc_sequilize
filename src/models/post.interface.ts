import Sequelize from 'sequelize';

export interface Post {
    author: string;
    content: string;
    title: string;
}

export interface PostInstance extends Post{
}

