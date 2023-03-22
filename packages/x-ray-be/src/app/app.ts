import express from 'express'
import { router } from '../routers/routes'
import { connectDB } from '../services/db'

export const createApp = () => {

  const app = express()
  connectDB()


  app.use("/api", router);
  return app
}
