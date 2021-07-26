import express from 'express'
import { getHostpitelbyID, getHostpitels } from '../hospitel/get'
import { setHostpitel } from '../hospitel/set'
const router = express.Router()

router.get('/', async (req, res) => {
  const resp = await getHostpitels()
  res.status(200).send(resp)
})
router.post('/', (req, res) => {
  const newHospitel = setHostpitel(req)
  res.status(200).json(newHospitel)
})

router.get('/:_id', async (req, res) => {
  const resp = await getHostpitelbyID(req)
  res.status(200).send(resp)
})

router.post('/', async (req, res) => {
  const resp = await setHostpitel(req)
  res.status(200).json(resp)
})

export default router