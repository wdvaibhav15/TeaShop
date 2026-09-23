import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Explicitly resolve the path to the .env file in the server folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import adminRoutes from './routes/adminRoutes.js';
import addCups from './routes/AddCups.js';

// Connect to Database
connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean),
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Routes
app.use('/api/auth', authRoutes);

//Admin Routes
app.use('/api/admin', adminRoutes);

//Add coffee
app.use('/api/coffee', addCups);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});