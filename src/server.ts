import authRoutes from './routes/auth.routes';
import database from './config/database';
import 'dotenv/config';
import express from 'express';

//Express
const app = express();

//Database
database();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

export default app;



