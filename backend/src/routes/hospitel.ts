import express from 'express'
import jwt from 'express-jwt'
import { JWT_SECRET } from 'src/config'
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

// routes below this are protected
router.use(jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }))

export default router
