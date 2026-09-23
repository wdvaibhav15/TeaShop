// import express from 'express';
// import { addCoffee, deleteCoffee } from '../controllers/ManageCoffee.js';

// const router = express.Router();

// router.post('/add-coffee', addCoffee);
// router.post('/delete-coffee', deleteCoffee);

// export default router;

import express from 'express';
import { addCoffee, deleteCoffee } from '../controllers/ManageCoffee.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

// Middleware field name 'imageFile' matches formData.append('imageFile', imageFile)
router.post('/add-coffee', upload.single('imageFile'), addCoffee);
router.post('/delete-coffee', deleteCoffee);
router.delete('/delete-coffee/:id', deleteCoffee);

export default router;