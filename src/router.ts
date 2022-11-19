import { Router } from 'express';
import * as db from './queries';

const router = Router();

router.get('/', db.getUsers);
router.get('/:id', db.getUserById);
router.post('/', db.createUser);
router.put('/:id', db.updateUser);
router.delete('/:id', db.deleteUser);

export default router;
