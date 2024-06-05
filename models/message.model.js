import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define('message', {
    text: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
