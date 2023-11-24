const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {

  // User-specific method
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// initialize User Model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      // password must be at least 8 characters long
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {

      // this method runs before the creation of every new User
      beforeCreate: (newUserData) => {
        const salt = bcrypt.genSaltSync(10, 'a');
        newUserData.password = bcrypt.hashSync(newUserData.password, salt);
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
  }
);

module.exports = User;
