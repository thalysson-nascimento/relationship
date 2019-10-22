import Sequelize from 'sequelize';

import User from '../app/models/User';
import PostModule from '../app/models/PostModule';
import CommentModule from '../app/models/CommentModule';

import databaseConfig from '../config/database';

const models = [User, PostModule, CommentModule];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.conection))
      .map(model => model.associate && model.associate(this.conection.models));
  }
}

export default new Database();
