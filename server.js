import express from 'express'
const app = express()

// Middleware
import notFoundMiddleware from './middleware/not-found.js'
notFoundMiddleware

app.get('/', (req, res) => {
  res.send("Welcome!")
})

app.use(notFoundMiddleware)

const port = process.env.PORT || 5000

app.listen(port, () => { console.log(`Server is running on port ${port}...`) })