import express from 'express'
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
  const resp = await getHostpitelbyID(req)
  res.status(200).send(resp)
})

router.post('/', async (req, res) => {
  const resp = await createHospitel(req)
  res.status(200).json(resp)
})

export default router
