import { Pokemon, Vote } from '../models/index.js';
import { Op, fn, col, literal } from 'sequelize';

export async function getAll(req, res, next) {
  try {
    const where = {};
    if (req.query.name) {
      where.name = {
        [Op.iLike]: `%${req.query.name}%`,
      };
    }

    const pokemons = await Pokemon.findAll({
      where,
      include: 'types',
    });
    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}

export async function comparePokemons(req, res, next) {
  try {
    const firstPokemon = await Pokemon.findByPk(req.params.firstId, {
      include: 'types',
    });

    if (!firstPokemon) {
      return res.status(404).json({ error: 'First pokemon not found' });
    }

    const secondPokemon = await Pokemon.findByPk(req.params.secondId, {
      include: 'types',
    });

    if (!secondPokemon) {
      return res.status(404).json({ error: 'Second pokemon not found' });
    }

    res.status(200).json({ firstPokemon, secondPokemon });
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id, {
      include: ['types', 'votes'],
    });

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    const response = {
      ...pokemon.toJSON(),
      votesCount: pokemon.votes.length,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function pokemonVote(req, res, next) {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    const existingVote = await Vote.findOne({
      where: {
        user_id: req.user.user_id,
        pokemon_id: req.params.id,
      },
    });

    if (existingVote) {
      return res
        .status(409)
        .json({ error: 'You already voted for this pokemon' });
    }

    await Vote.create({
      pokemon_id: pokemon.id,
      user_id: req.user.user_id,
    });

    res.status(201).json({ message: 'Vote added successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getPokemonVote(req, res, next) {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    const votes = await Vote.count({
      where: { pokemon_id: req.params.id },
    });

    res
      .status(200)
      .json({ pokemon_id: pokemon.id, pokemon_name: pokemon.name, votes });
  } catch (error) {
    next(error);
  }
}

export async function getPodium(req, res, next) {
  try {
    const podium = await Vote.findAll({
      //On compte les votes
      attributes: ['pokemon_id', [fn('COUNT', col('Vote.id')), 'votes']],
      //On ajoute les infos du pokemon
      include: [
        {
          model: Pokemon,
          as: 'pokemon',
          attributes: ['id', 'name'],
        },
      ],
      //On regroupe par pokemon
      group: ['pokemon_id', 'pokemon.id'],
      //On définit l'odre du podium et le nombre de pokemons à afficher
      order: [[literal('votes'), 'DESC']],
      limit: 10,
    });
    res.status(200).json(podium);
  } catch (error) {
    next(error);
  }
}
