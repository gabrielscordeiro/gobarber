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

  checkPassword(password) {
    return Bcrypt.compare(password, this.password_hash)
  }
}

export default User;
