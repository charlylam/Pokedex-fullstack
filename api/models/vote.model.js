import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Vote extends Model {}

Vote.init(
  {
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "unique_user_pokemon_vote"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "unique_user_pokemon_vote"
    }
  },
  {
    sequelize,
    tableName: "vote"
  }
);