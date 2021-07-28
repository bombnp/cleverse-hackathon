import { Hospitel } from './schema'

export async function getHostpitels() {
  try {
    const hospitels = await Hospitel.find()
    return hospitels
  } catch (err) {
    throw err
  }
}

export async function getHostpitelbyID(id: string) {
  try {
    const hospitel = await Hospitel.findById(id)
    return hospitel
  } catch (err) {
    throw err
  }
}
