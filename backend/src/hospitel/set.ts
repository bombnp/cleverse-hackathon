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
