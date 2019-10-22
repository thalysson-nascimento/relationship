import Sequelize, { Model } from 'sequelize';

class CommentModule extends Model {
  static init(sequelize) {
    super.init(
      {
        comment: Sequelize.STRING,
        note: Sequelize.NUMBER,
        user_id: Sequelize.NUMBER,
        module_id: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.PostModule, {
      foreignKey: 'module_id',
      as: 'module',
    });
  }
}

export default CommentModule;
