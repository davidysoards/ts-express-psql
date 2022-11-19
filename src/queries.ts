import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // 'SELECT * FROM users ORDER BY id ASC'
  try {
    const users = await prisma.users.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  // 'SELECT * FROM users WHERE id = $1'
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: { id: +id },
    });
    if (!user) {
      res.status(404);
      throw new Error(`User with id ${id} not found.`);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
  try {
    const { name, email } = req.body;
    const user = await prisma.users.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  // 'UPDATE users SET name = $1, email = $2 WHERE id = $3',
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prisma.users.update({
      where: { id: +id },
      data: { name, email },
    });
    if (!user) {
      res.status(404);
      throw new Error(`User with id ${id} not found.`);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  // 'DELETE FROM users WHERE id = $1'
  try {
    const { id } = req.params;
    const user = await prisma.users.delete({
      where: { id: +id },
    });
    if (!user) {
      res.status(404);
      throw new Error(`User with id ${id} not found.`);
    }
    res.status(204);
  } catch (err) {
    next(err);
  }
};
