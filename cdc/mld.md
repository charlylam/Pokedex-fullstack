role (
    id,
    name
)

user (
id, -- identifiant entier unique généré automatiquement
username, -- chaîne de caractère non vide unique
email, -- chaine de caractères non vide unique
password, -- chaine de caractères non vide (hashé)
)

team (
id, -- identifiant entier unique généré automatiquement
name, -- chaîne de caractère non vide
description, -- texte ou chaine de caractères
)

pokemon (
id, -- identifiant entier unique généré automatiquement
name, -- chaîne de caractère non vide unique
hp, -- entier positif non nul
atk, -- entier positif non nul
def, -- entier positif non nulle
atk_spe, -- entier positif non nul
def_spe, -- entier positif non nul
speed, -- entier positif non nul
)

type (
id, -- identifiant entier unique généré automatiquement
name, -- chaîne de caractère non nul
color, -- chaîne de caractère non nul
)

vote (
    id, -- identifiant entier unique généré automatiquement
    pokemon_id #FK -> pokemon.id
)

pokemon_type (
id, -- identifiant entier unique généré automatiquement
pokemon_id, #FK -> pokemon.id
type_id, #FK -> type.id
)

team_pokemon (
id, -- identifiant entier unique généré automatiquement
team_id, #FK -> team.id
pokemon_id, #FK -> pokemon.id
)
