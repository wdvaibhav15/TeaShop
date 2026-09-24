
import express from 'express';
import { addCoffee, deleteCoffee, getCoffeeById, getCoffeeData } from '../controllers/ManageCoffee.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();


router.post('/add-coffee', upload.single('imageFile'), addCoffee);
router.get('/get-coffees', getCoffeeData);
router.get('/get-coffees/:id', getCoffeeById);
router.post('/delete-coffee', deleteCoffee);
router.delete('/delete-coffee/:id', deleteCoffee);

export default router;