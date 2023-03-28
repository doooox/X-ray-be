import cors from 'cors'
import express from 'express'
import { router } from '../routers/routes'
import { connectDB } from '../services/db'
import { corsOptions } from '../utils/static'

export const createApp = () => {
  connectDB()

  const app = express();

  app.use(cors(corsOptions))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('trust proxy', 1);

  app.use('/api', router);

  return app;
}
