import express from 'express'
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

export default router
