import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import "express-async-errors"
import morgan from 'morgan'

// Imports for production
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// Database
import connectDB from './db/connect.js'

// Middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

// Routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// Don't use the package if we are in the production environment
if (process.env.NODE_ENV != "production") {
  app.use(morgan('dev'))
}

app.use(express.json())

// Because we are using ES6 modules, we need to get a proper path with "meta.url"
const __dirname = dirname(fileURLToPath(import.meta.url))

// Add the middleware to serve the build folder as a static asset (publicly available) when deploying. This way when we run server, we can return the front-end application
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// Use this line after the two line above because we want to serve the main index.html after those two routes. This way react router that is located there will get triggered correctly
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5005

// Run the server if the connection to the mongoDB was successful
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()