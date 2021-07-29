import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { MONGO_URI, PORT } from './config'
import { errorHandler } from './errors'
import authRouter from './routes/auth'
import hospitelRouter from './routes/hospitel'
import subscriptionRouter from './routes/subscription'
import uploadRouter from './routes/upload'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!')
})

app.use('/auth', authRouter)
app.use('/hospitels', hospitelRouter)
app.use('/subscription', subscriptionRouter)
app.use('/upload', uploadRouter)

// Error handling
app.use(errorHandler)

console.log(`Connecting to MongoDB...`)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () =>
      console.log(`Connected! App running on port ${PORT}`),
    )
  })
  .catch((err) => {
    console.log(err)
  })
