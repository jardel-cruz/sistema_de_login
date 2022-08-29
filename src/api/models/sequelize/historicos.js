'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Historicos.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Historicos.init({
    valor: DataTypes.INTEGER,
    destino: DataTypes.STRING,
    motivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Historicos',
  });
  return Historicos;
};