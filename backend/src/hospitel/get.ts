import { Request } from 'express'
import { Hospitel } from './schema'

interface filterHospitelDTO {
  province: string
  district: string
}
export async function getHostpitels(req: Request<{}, {}, filterHospitelDTO>) {
  if (req.body.district == 'all' && req.body.province == 'all') {
    const hospitels = await Hospitel.find()
    return hospitels
  } else if (req.body.district != 'all' && req.body.province != 'all') {
    const hospitels = await Hospitel.find({
      'address.province': req.body.province,
      'address.district': req.body.district,
    })
    return hospitels
  } else if (req.body.district == 'all') {
    const hospitels = await Hospitel.find({
      'address.province': req.body.province,
    })
    return hospitels
  }
}

export async function getHostpitelbyID(id: string) {
  const hospitel = await Hospitel.findById(id)
  return hospitel
}
