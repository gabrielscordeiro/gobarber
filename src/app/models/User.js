import Sequelize, { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,//campo que nunca vai existir no bd
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    }, {
      sequelize
    });

    //esses hooks são trechos de código que são executados de forma automática baseado em ações que acontecem no Model
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await Bcrypt.hash(user.password, 8);
      }
    });

    return this;//sempre retorna o model que acabou de ser inicializado
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });//esse model de usuario pertence a um model de file. Isso quer dizer que vai ter um Id de arquivo sendo armazenado dentro do model de usuário
  }

  checkPassword(password) {
    return Bcrypt.compare(password, this.password_hash)
  }
}

export default User;
