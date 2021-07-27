import { Hospitel } from './schema'
import { sanitizeHospitel, sanitizeHospitels } from './util'

export async function getHostpitels() {
  const hospitels = await Hospitel.find()
  return sanitizeHospitels(hospitels)
}

export async function getHostpitelbyID(req: any) {
  const id = req.params
  const hospitel = await Hospitel.findById(id)
  return sanitizeHospitel(hospitel)
}
