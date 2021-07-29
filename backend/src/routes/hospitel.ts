import express from 'express'
import passport from 'passport'
import { getHostpitelbyID, getHostpitels } from 'src/hospitel/get'
import { updateAvailableRoom } from 'src/hospitel/set'
import { nearestAlert } from 'src/subscription/utils'

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/', async (req, res) => {
  const resp = await getHostpitels(req)
  res.send(resp)
})

router.get('/:_id', async (req, res) => {
  const id = req.params['_id']
  const resp = await getHostpitelbyID(id)
  res.send(resp)
})

// routes below this are protected
router.use(passport.authenticate('jwt', { session: false }))

router.put('/availablerooms', async (req, res) => {
  const resp = await updateAvailableRoom(req)
  await nearestAlert()
  res.json(resp)
})
export default router
