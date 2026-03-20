import Joi from 'joi';
import { checkBody } from '../utils/common.utils.js';

export function validateTeamCreation(req, res, next) {
  const createTeamSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
  });
  checkBody(createTeamSchema, req.body, res, next);
}

export function validateTeamUpdate(req, res, next) {
  const updateTeamSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
  });
  checkBody(updateTeamSchema, req.body, res, next);
}
