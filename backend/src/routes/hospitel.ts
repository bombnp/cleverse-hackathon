import express from 'express'
import passport from 'passport'
import { getHostpitelbyID, getHostpitels } from 'src/hospitel/get'
import { createHospitel, updateAvailableRoom } from 'src/hospitel/set'

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
  try {
    const resp = await getHostpitels()
    res.status(200).send(resp)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:_id', async (req, res) => {
  const id = req.params['_id']
  try {
    const resp = await getHostpitelbyID(id)
    res.status(200).send(resp)
  } catch (err) {
    res.status(500).send(err)
  }
})

//TODO: delete me
router.post('/', async (req, res) => {
  const resp = await createHospitel(req)
  res.status(200).json(resp)
})

router.post('/availablerooms', async (req, res) => {
  try {
    const resp = await updateAvailableRoom(req)
    res.status(200).json(resp)
  } catch (err) {
    res.status(400).send(err)
  }
})

// routes below this are protected
router.use(passport.authenticate('jwt', { session: false }))

export default router
