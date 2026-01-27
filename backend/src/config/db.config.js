import dotenv from 'dotenv';
import Sequelize from 'sequelize';
dotenv.config(); // Ensure dotenv is configured to load environment variables

const DBOption = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // Convert DB_PORT to integer
  dialect: process.env.DB_DIALECT,
  timezone: '+05:30',
  define: {
    timestamps: false
  },
  logging: false,
  sync: { force: true }
};

if (process.env.DB_SOCKET) {
  DBOption.dialectOptions = {
    socketPath: process.env.DB_SOCKET
  };
}
if (process.env.ENVIRONMENT !== 'development' &&
  process.env.ENVIRONMENT !== 'staging' &&
  process.env.ENVIRONMENT !== 'local' &&
  process.env.ENVIRONMENT !== 'uat') {
  // const serverCa = [fs.readFileSync(process.env.DB_CERTIFICATE_PATH, "utf8")];
  DBOption.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  DBOption
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
