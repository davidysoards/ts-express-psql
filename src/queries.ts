import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  // 'SELECT * FROM users ORDER BY id ASC'
  const users = await prisma.users.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  // 'SELECT * FROM users WHERE id = $1'
  const id = parseInt(req.params.id);
  const user = await prisma.users.findUnique({
    where: { id },
  });
  res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  // 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
  const { name, email } = req.body;
  const user = await prisma.users.create({
    data: { name, email },
  });
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  // 'UPDATE users SET name = $1, email = $2 WHERE id = $3',
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = await prisma.users.update({
    where: { id },
    data: { name, email },
  });
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  // 'DELETE FROM users WHERE id = $1'
  const id = parseInt(req.params.id);
  await prisma.users.delete({
    where: { id },
  });
  res.status(204).send(`Removed user with ID: ${id}`);
};
