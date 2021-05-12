export default {
  type: 'better-sqlite3',
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};
