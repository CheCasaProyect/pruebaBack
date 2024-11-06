import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    synchronize: boolean;
    dropSchema: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
    extra: {
        connectionTimeoutMillis: number;
    };
    ssl: {
        rejectUnauthorized: boolean;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    synchronize: boolean;
    dropSchema: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
    extra: {
        connectionTimeoutMillis: number;
    };
    ssl: {
        rejectUnauthorized: boolean;
    };
}>;
export default _default;
export declare const connetionSource: DataSource;
