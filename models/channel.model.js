import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define(
    'channel',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          is: /^\w{3,}$/, // length of at least 3, only use letters, numbers and underscores
        },
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
  );
};
