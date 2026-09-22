import express from 'express';
import { addCoffee, deleteCoffee } from '../controllers/ManageCoffee.js';

const router = express.Router();

router.post('/add-coffee', addCoffee);
router.post('/delete-coffee', deleteCoffee);

export default router;

