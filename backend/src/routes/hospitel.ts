import express from 'express'
import passport from 'passport'
import { getHostpitelbyID, getHostpitels } from 'src/hospitel/get'
import { updateAvailableRoom } from 'src/hospitel/set'
import { nearestAlert } from 'src/subscription/utils'

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
  const resp = await getHostpitels()
  res.send(resp)
})

router.get('/:_id', async (req, res) => {
  const id = req.params['_id']
  const resp = await getHostpitelbyID(id)
  res.send(resp)
})

router.post('/availablerooms', async (req, res) => {
  const resp = await updateAvailableRoom(req)
  await nearestAlert()
  res.json(resp)
})

// routes below this are protected
router.use(passport.authenticate('jwt', { session: false }))

export default router
