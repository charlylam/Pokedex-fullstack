import { Type } from '../models/index.js';

export async function getAll(_req, res, next) {
  try {
    const types = await Type.findAll({
      include: 'pokemons',
    });
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const type = await Type.findByPk(req.params.id, {
      include: 'pokemons',
    });

    if (!type) {
      return res.status(404).json({ error: 'Type not found' });
    }

    res.status(200).json(type);
  } catch (error) {
    next(error);
  }
}
