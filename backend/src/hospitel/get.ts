import { Request } from 'express'
import { Hospitel } from './schema'

export async function getHostpitels() {
  const hospitels = await Hospitel.find()
  return hospitels
}

export async function getHostpitelbyID(req: Request) {
  const id = req.params['_id']
  const hospitel = await Hospitel.findById(id)
  return hospitel
}
