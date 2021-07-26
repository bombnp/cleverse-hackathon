import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!')
})

app.listen(port, () => console.log(`App running on port ${port}`))
mongoose
  .connect(
    'mongodb+srv://dbuser:fbUserPassword@cluster0.wmsog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then((result) => {
    app.listen(port, () => console.log(`App running on port ${port}`))
  })
  .catch((err) => {
    console.log(err)
  })
