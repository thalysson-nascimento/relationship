import Sequelize, { Model } from 'sequelize';

class DefineSystem extends Model {
  static init(sequelize) {
    super.init(
      {
        name_system: Sequelize.STRING,
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'define_system' });
  }
}

export default DefineSystem;
