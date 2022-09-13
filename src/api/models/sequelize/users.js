'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Historicos, { foreignKey: "user_id" });
    }
  }
  Users.init({
    nome: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    saldo: DataTypes.INTEGER,
    email: DataTypes.STRING,
    email_verificado: DataTypes.INTEGER,
    securet: DataTypes.STRING,
    cargo: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["admin", "assinante", "editor"]],
          msg: "Cargo invalido"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};