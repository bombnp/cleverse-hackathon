import express from 'express'
import jwt from 'express-jwt'
import { JWT_SECRET } from 'src/config'
import { setSubscription } from 'src/subscription/set'
const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/', async (req, res) => {
  try {
    const resp = await setSubscription(req)
    res.status(200).send(resp)
  } catch (error) {
    res.status(500).send(error)
  }
})

// routes below this are protected
router.use(jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }))

export default router
