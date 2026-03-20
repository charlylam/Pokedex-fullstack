import express from "express";
import { getAll, getById } from "../controllers/type.controller.js";
import { validateId } from "../middlewares/common.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get all types
 *     tags:
 *       - Types
 *     responses:
 *       200:
 *         description: List of types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 */
router.get("/", getAll);

/**
 * @swagger
 * /types/{id}:
 *   get:
 *     summary: Get one type by id
 *     tags:
 *       - Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Type id
 *     responses:
 *       200:
 *         description: Type found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       404:
 *         description: Type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateId, getById);

export default router;