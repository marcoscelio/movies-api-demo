"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'better-sqlite3',
    database: process.env.DB_DATABASE,
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
//# sourceMappingURL=ormconfig.js.map