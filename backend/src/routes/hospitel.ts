import express from 'express'
import passport from 'passport'
import { getHostpitelbyID, getHostpitels } from 'src/hospitel/get'
import { createHospitel } from 'src/hospitel/set'

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
  const resp = await getHostpitels()
  res.status(200).send(resp)
})

router.get('/:_id', async (req, res) => {
  const id = req.params['_id']
  const resp = await getHostpitelbyID(id)
  res.status(200).send(resp)
})

router.post('/', async (req, res) => {
  const resp = await createHospitel(req)
  res.status(200).json(resp)
})

// routes below this are protected
router.use(passport.authenticate('jwt', { session: false }))

export default router
