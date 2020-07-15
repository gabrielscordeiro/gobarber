import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      date: Sequelize.DATE,
      canceled_at: Sequelize.DATE,
    }, {
      sequelize
    });

    return this;//sempre retorna o model que acabou de ser inicializado
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });//esse model de usuario pertence a um model de file. Isso quer dizer que vai ter um Id de arquivo sendo armazenado dentro do model de usuário
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
