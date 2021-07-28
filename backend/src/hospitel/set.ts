import { Request } from 'express'
import { Hospitel } from './schema'

interface CreateHospitelDTO {
  userEmail: string
  userPassword: string
  name: string
  totalRooms: number
  availableRooms: number
  maxPrice: number
  minPrice: number
  imageUrl?: string
  province: string
  district: string
  address?: string
  latitude: number
  longitude: number
}

interface UpdateAvailableRoomsDTO {
  id: string
  availableRooms: number
}

export async function createHospitel(req: Request<{}, {}, CreateHospitelDTO>) {
  const body = req.body
  const hospitel = new Hospitel({
    userEmail: body.userEmail,
    userPassword: body.userPassword,
    name: body.name,
    totalRooms: body.totalRooms,
    availableRooms: body.availableRooms,
    minPrice: body.minPrice,
    maxPrice: body.maxPrice,
    imageUrl: body.imageUrl,
    province: body.province,
    district: body.district,
    address: body.address,
    latitude: body.latitude,
    longitude: body.longitude,
  })

  const res = await hospitel.save()
  return res
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
