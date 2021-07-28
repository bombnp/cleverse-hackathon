import express from 'express'
import passport from 'passport'
import { setSubscription } from 'src/subscription/set'
const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/', async (req, res) => {
  const resp = await setSubscription(req)
  res.send(resp)
})

// routes below this are protected
router.use(passport.authenticate('jwt', { session: false }))

export default router
