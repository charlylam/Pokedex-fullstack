import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
    logging: false,
    dialectOptions: process.env.PG_SSL === "true"
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
});

await sequelize.authenticate();