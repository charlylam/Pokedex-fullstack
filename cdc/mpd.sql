DROP TABLE IF EXISTS team_pokemon, pokemon, team;

CREATE TABLE users (
    id integer PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE role (
    id integer PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE team (
    id integer PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE pokemon (
    id integer PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    hp integer NOT NULL,
    atk integer NOT NULL,
    def integer NOT NULL,
    atk_spe integer NOT NULL,
    def_spe integer NOT NULL,
    speed integer NOT NULL
);

CREATE TABLE type (
    id integer PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL
);

CREATE TABLE vote (
    id integer PRIMARY KEY,
    pokemon_id INTEGER NOT NULL 
    REFERENCES pokemon(id) 
    ON DELETE CASCADE
);

CREATE TABLE team_pokemon (
    id integer PRIMARY KEY,
    team_id integer NOT NULL,
    pokemon_id integer NOT NULL,
    CONSTRAINT fk_team
        FOREIGN KEY(team_id)
        REFERENCES team(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_pokemon
        FOREIGN KEY(pokemon_id)
        REFERENCES pokemon(id)
        ON DELETE CASCADE
);

CREATE TABLE pokemon_type (
    id integer PRIMARY KEY,
    pokemon_id integer NOT NULL,
    type_id integer NOT NULL,
    CONSTRAINT fk_pokemon
        FOREIGN KEY(pokemon_id)
        REFERENCES pokemon(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_type
        FOREIGN KEY(type_id)
        REFERENCES type(id)
        ON DELETE CASCADE
);
