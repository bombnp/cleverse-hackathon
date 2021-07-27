import { Hospitel } from './schema'

export async function getHostpitels() {
  const hospitels = await Hospitel.find()
  return hospitels
}

export async function getHostpitelbyID(id: string) {
  const hospitel = await Hospitel.findById(id)
  return hospitel
}
