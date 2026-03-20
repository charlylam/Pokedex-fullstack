import { Team, Pokemon } from '../models/index.js';

export async function getAll(req, res, next) {
  try {
    const teams = await Team.findAll({
      include: req.query.include === 'pokemons' ? 'pokemons' : undefined,
    });

    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const team = await Team.create({
      ...req.body,
      user_id: req.user.user_id,
    });

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: req.query.include === 'pokemons' ? 'pokemons' : undefined,
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
}

export async function deleteById(req, res, next) {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await team.destroy();

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function updateById(req, res, next) {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await team.update(req.body);

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
}

export async function addPokemonToTeam(req, res, next) {
  try {
    const team = await Team.findByPk(req.params.teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const pokemon = await Pokemon.findByPk(req.params.pokemonId);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    const pokemonAlreadyInTeam = await team.hasPokemon(pokemon);
    if (pokemonAlreadyInTeam) {
      return res.status(409).json({ error: 'Pokemon already in this team' });
    }

    const pokemonsCount = await team.countPokemons();
    if (pokemonsCount >= 6) {
      return res.status(400).json({ error: 'No more than 6 Pokemons by team' });
    }
    await team.addPokemon(pokemon);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function removePokemonFromTeam(req, res, next) {
  try {
    const team = await Team.findByPk(req.params.teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const pokemon = await Pokemon.findByPk(req.params.pokemonId);

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    const hasPokemon = await team.hasPokemon(pokemon);
    if (!hasPokemon) {
      return res.status(404).json({ error: 'Pokemon not in this team' });
    }

    await team.removePokemon(pokemon);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
