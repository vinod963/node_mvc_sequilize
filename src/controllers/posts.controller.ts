import * as express from 'express';
import {Post} from '../models/post.interface';
import {User,UserInstance} from '../models/user.interface';


 import { createModels } from '../models';
 const sequelizeConfig = require('./../config/sequelizeConfig.json');
 const db = createModels(sequelizeConfig);
 db.sequelize.sync();
 
class PostsController {
  public path = '/posts';
  public router = express.Router({});
  
 
getPostById(request, response) {
 return response.send('test');
}
 
  private posts: Post[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ];
 
  constructor() {    
    this.intializeRoutes();
    this.router.get('/posts/:id', this.getPostById);
  }
 
  public intializeRoutes() {
    // this.router.get(this.path, this.getAllPosts);
    // this.router.post(this.path, this.createAPost);
    //this.router.get(this.path, this.createAUser);
    this.router.get(this.path, this.getUser);
    
  }

 
  getAllPosts = (request, response) => {
    db.Post.findAll().then((users) => {
      response.status(200).json({ users })
    }).catch(err => response.status(500).json({ err: ['oops', err] }));        
  }

  getUser = (request, response) => {
    db.User.findByPk(1)
      .then((user:UserInstance) =>{return  [user,user.getPosts()]})
      .spread((user,posts)=>{
        response.status(200).json(user);     
    }).catch(err => response.status(500).json({ err: ['oops', err] }));
    
  }
 
  createAPost = (request, response) => {
    const post: Post = request.body;
    this.posts.push(post);
    response.send(post);
  }

  createAUser = (request, response) => {
    const user: User = {name:'Vinod'};
    db.User.create(user).then(e=>{response.send(e);})
    .catch(err=>{ response.send(err); });
  }
}
 
export default PostsController;