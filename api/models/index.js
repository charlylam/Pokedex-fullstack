import { Team } from "./team.model.js";
import { Pokemon } from "./pokemon.model.js";
import { Type } from "./type.model.js";
import { Users } from "./users.model.js";
import { Role } from "./role.model.js";
import { Vote } from "./vote.model.js";
import { sequelize } from "./sequelize.client.js";

Role.hasMany(Users, {
  foreignKey: "role_id",
  as: "users"
});

Users.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role"
});

Users.hasMany(Team, {
  foreignKey: "user_id",
  as: "teams"
});

Team.belongsTo(Users, {
  foreignKey: "user_id",
  as: "owner"
});

Users.hasMany(Vote, {
  foreignKey: "user_id",
  as: "votes"
});

Vote.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user"
});

Pokemon.hasMany(Vote, {
  foreignKey: "pokemon_id",
  as: "votes"
});

Vote.belongsTo(Pokemon, {
  foreignKey: "pokemon_id",
  as: "pokemon"
});

Team.belongsToMany(Pokemon, {
    as: "pokemons",
    through: "team_pokemon",
    foreignKey: "team_id",
    otherKey: "pokemon_id"
});

Pokemon.belongsToMany(Team, {
    as: "teams",
    through: "team_pokemon",
    foreignKey: "pokemon_id",
    otherKey: "team_id"
});

Pokemon.belongsToMany(Type, {
    as: "types",
    through: "pokemon_type",
    foreignKey: "pokemon_id",
    otherKey: "type_id"
});

Type.belongsToMany(Pokemon, {
    as: "pokemons",
    through: "pokemon_type",
    foreignKey: "type_id",
    otherKey: "pokemon_id"
});

export { Team, Pokemon, Type, Users, Role, Vote, sequelize };