import express from 'express'
import mongoose from 'mongoose'
import { MONGO_URI, PORT } from './config'
import hospitelRouter from './routes/hospitel'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!')
})

app.use('/hospitels', hospitelRouter)

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => console.log(`App running on port ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })
