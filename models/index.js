import { Sequelize } from 'sequelize';
import userModel from './user.model';
import teamModel from './team.model';
import channelModel from './channel.model';
import messageModel from './message.model';
import applyExtraSetup from './extra-setup';

// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  define: { underscored: true },
});

const modelDefiners = [userModel, teamModel, channelModel, messageModel];

// Define models
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Add associations
applyExtraSetup(sequelize);

export default sequelize;
