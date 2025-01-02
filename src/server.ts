import authRoutes from './routes/auth.routes';
import database from './config/database';
import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { corsConfig } from './config/cors';

//Express
const app = express();

//Database
database();

//CORS
app.use(cors(corsConfig));

//Body Parser
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

export default app;



