import { Hospitel } from './schema'

export async function getHostpitels() {
  const resp = await Hospitel.find()
  return resp
}

export async function getHostpitelbyID(req: any) {
  const id = req.params
  const resp = await Hospitel.findById(id)
  return resp
}
