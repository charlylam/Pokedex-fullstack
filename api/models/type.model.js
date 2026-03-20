import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Type extends Model{};

Type.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "type"
})