import express from "express";
import {
  getAll,
  getById,
  comparePokemons,
  pokemonVote,
  getPokemonVote,
  getPodium
} from "../controllers/pokemon.controller.js";
import { validateId } from "../middlewares/common.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Get all pokemons
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter pokemons by name
 *         example: dra
 *     responses:
 *       200:
 *         description: List of pokemons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */
router.get("/", getAll);

/**
 * @swagger
 * /pokemons/compare/{firstId}/{secondId}:
 *   get:
 *     summary: Compare two pokemons
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: firstId
 *         required: true
 *         schema:
 *           type: integer
 *         description: First pokemon id
 *       - in: path
 *         name: secondId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Second pokemon id
 *     responses:
 *       200:
 *         description: Comparison of two pokemons
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComparePokemonsResponse'
 *       404:
 *         description: One of the pokemons was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/compare/:firstId/:secondId", comparePokemons);

/**
 * @swagger
 * /pokemons/podium:
 *   get:
 *     summary: Get top 10 most voted pokemons
 *     tags:
 *       - Pokemons
 *     responses:
 *       200:
 *         description: Podium of most voted pokemons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pokemon_id:
 *                     type: integer
 *                     example: 6
 *                   votes:
 *                     type: string
 *                     example: "12"
 *                   pokemon:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 6
 *                       name:
 *                         type: string
 *                         example: Dracaufeu
 */
router.get("/podium", getPodium);

/**
 * @swagger
 * /pokemons/{id}/votes:
 *   get:
 *     summary: Get number of votes for one pokemon
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pokemon id
 *     responses:
 *       200:
 *         description: Number of votes for this pokemon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonVotesResponse'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id/votes", validateId, getPokemonVote);

/**
 * @swagger
 * /pokemons/{id}/votes:
 *   post:
 *     summary: Vote for a pokemon
 *     tags:
 *       - Pokemons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pokemon id
 *     responses:
 *       201:
 *         description: Vote added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VoteSuccessMessage'
 *       401:
 *         description: Authorization token missing, invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: User already voted for this pokemon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/:id/votes", authenticate, validateId, pokemonVote);

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Get one pokemon by id
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pokemon id
 *     responses:
 *       200:
 *         description: Pokemon found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateId, getById);

export default router;