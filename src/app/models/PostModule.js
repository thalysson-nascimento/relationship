import Sequelize, { Model } from 'sequelize';

class PostModule extends Model {
  static init(sequelize) {
    super.init(
      {
        name_module: Sequelize.STRING,
        description: Sequelize.STRING,
        user_id: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default PostModule;
