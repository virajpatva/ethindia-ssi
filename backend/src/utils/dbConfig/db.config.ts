import { Sequelize } from "sequelize"

const DB_HOST: any = process.env.DB_HOST
const DB_NAME: any = process.env.DB_NAME
const DB_USER: any = process.env.DB_USER
const DB_PASSWORD: any = process.env.DB_PASSWORD
const DB_PORT: any = process.env.DB_PORT

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mariadb",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        underscored: true,
    },
    timezone: "Etc/GMT0",
    logging: process.env.ENV === "prod" ? false : console.log,
})

export default sequelize
