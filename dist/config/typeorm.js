"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connetionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env' });
console.log('Database Username: ', process.env.DB_USERNAME);
console.log('Database Password:', process.env.DB_PASSWORD);
const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    extra: {
        connectionTimeoutMillis: 45000,
    },
    ssl: {
        rejectUnauthorized: false,
    },
};
console.log(process.env.DB_PASSWORD);
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connetionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map