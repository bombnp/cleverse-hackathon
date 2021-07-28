import { Request } from 'express'
import { Hospitel } from './schema'
interface UpdateAvailableRoomsDTO {
  id: string
  availableRooms: number
}

export async function updateAvailableRoom(
  req: Request<{}, {}, UpdateAvailableRoomsDTO>,
) {
  const filter = { _id: req.body.id }
  const update = { availableRooms: req.body.availableRooms }
  const hospitel = await Hospitel.findById(req.body.id)
  if (!hospitel) {
    throw { status: 404, message: "can't find hospitel" }
  } else if (req.body.availableRooms > hospitel.totalRooms) {
    throw { status: 400, message: 'invalid number of available rooms' }
  }
  const res = await Hospitel.findOneAndUpdate(filter, update, {
    new: true,
  })
  return res
}
