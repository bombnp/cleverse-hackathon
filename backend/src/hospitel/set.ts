import { Request } from 'express'
import { HttpError } from 'src/errors'
import { Hospitel, HospitelDocument } from './schema'

interface UpdateAvailableRoomsDTO {
  availableRooms: number
}

export async function updateAvailableRoom(
  req: Request<{}, {}, UpdateAvailableRoomsDTO>,
) {
  const user = req.user as HospitelDocument
  if (req.body.availableRooms > user.totalRooms) {
    throw new HttpError(404, 'invalid number of available rooms')
  }
  const filter = { _id: user._id }
  const update = { availableRooms: req.body.availableRooms }
  const res = await Hospitel.findOneAndUpdate(filter, update, {
    new: true,
  })
  return res
}
