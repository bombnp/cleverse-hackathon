import express from 'express'
import mongoose from 'mongoose'
import { MONGO_URI, PORT } from './config'
import authRouter from './routes/auth'
import hospitelRouter from './routes/hospitel'
import subscriptionRouter from './routes/subscription'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!')
})

app.use('/auth', authRouter)
app.use('/hospitels', hospitelRouter)
app.use('/subscription', subscriptionRouter)

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => console.log(`App running on port ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })
