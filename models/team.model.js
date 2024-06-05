import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define('team', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^\w{3,}$/, // length of at least 3, only use letters, numbers and underscores
      },
    },
  });
};
