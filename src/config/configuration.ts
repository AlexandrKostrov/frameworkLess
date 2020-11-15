export default () => ({
    isGlobal: true,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: false,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    }
});