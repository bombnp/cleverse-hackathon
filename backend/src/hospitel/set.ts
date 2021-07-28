import { Request } from 'express'
import { HttpError } from 'src/errors'
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
    throw new HttpError(404, "can't find hospitel")
  }
  if (req.body.availableRooms > hospitel.totalRooms) {
    throw new HttpError(404, 'invalid number of available rooms')
  }
  const res = await Hospitel.findOneAndUpdate(filter, update, {
    new: true,
  })
  return res
}
