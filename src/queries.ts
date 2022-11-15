import { Request, Response } from 'express';
import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

export const getUsers = (req: Request, res: Response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const getUserById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email],
    (error, results) => {
      if (error) throw error;
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    },
  );
};

export const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`User modified with ID: ${id}`);
    },
  );
};

export const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    res.status(200).send(`User modified with ID: ${id}`);
  });
};
