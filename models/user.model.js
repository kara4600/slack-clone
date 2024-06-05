import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define('user', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^\w{3,}$/, // length of at least 3, only use letters, numbers and underscores
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^.{4,}$/, // length of at least 3
      },
    },
  });
};
