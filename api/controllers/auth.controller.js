import { Users, Role } from '../models/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function registerUser(req, res, next) {
  const hashedPassword = await argon2.hash(req.body.password);

  try {
    const userRole = await Role.findOne({
      where: {
        name: 'user',
      },
    });
    const user = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role_id: userRole.id,
    });
    res
      .status(201)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(409)
        .json({ error: 'Username or email already exists' });
    }
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const user = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user || !(await argon2.verify(user.password, req.body.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Connexion successful', token });
  } catch (error) {
    next(error);
  }
}

export async function getConnectedUser(req, res, next) {
  try {
    const user = await Users.findByPk(req.user.user_id, {
      attributes: ['id', 'username', 'email'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
