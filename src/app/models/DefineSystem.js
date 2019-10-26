import { Sequelize } from 'sequelize';

class DefineSystem {
  static init(sequelize) {
    super.init(
      {
        name_system: Sequelize.STRING,
        description: Sequelize.NUMBER,
        user_id: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default DefineSystem;
