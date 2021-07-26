import { Hospitel } from './schema'

export async function getHostpitel() {
  const res = await Hospitel.find()
  return res
}
