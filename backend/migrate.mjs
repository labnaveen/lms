// migrate.mjs
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DBOption = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // Convert DB_PORT to integer
  dialect: process.env.DB_DIALECT,
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

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  DBOption
);
// Set up Umzug for migrations
const migrationUmzug = new Umzug({
  migrations: {
    glob: join(__dirname, 'src/database/migrations/*.js'),
    resolve: ({ name, path, context }) => {
      return {
        name,
        up: async () => (await import(path)).up(context),
        down: async () => (await import(path)).down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
});

// Set up Umzug for seeders
const seederUmzug = new Umzug({
  migrations: {
    glob: join(__dirname, 'src/database/seeders/*.js'),
    resolve: ({ name, path, context }) => {
      return {
        name,
        up: async () => (await import(path)).up(context),
        down: async () => (await import(path)).down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'seeder_meta' }),
  logger: console,
});

// Run migrations
const runMigrations = async () => {
  await migrationUmzug.up();
};

// Run seeders
const runSeeders = async () => {
  await seederUmzug.up();
};

// Main function to run migrations and seeders
const main = async () => {
  try {
    await runMigrations();
    console.log('Migrations completed.');
    await runSeeders();
    console.log('Seeders completed.');
  } catch (error) {
    console.error('Migration/Seeder failed:', error);
  } finally {
    await sequelize.close();
  }
};

main();
