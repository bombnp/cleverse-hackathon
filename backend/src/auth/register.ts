import bcrypt from 'bcrypt'
import { Hospitel, HospitelDocument } from 'src/hospitel/schema'

export interface RegisterDTO {
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

const saltRounds = 12

export async function register(
  registerDTO: RegisterDTO,
): Promise<HospitelDocument> {
  const hospitel = await Hospitel.findOne({
    userEmail: registerDTO.userEmail,
  })
  if (hospitel) {
    throw { status: 404, message: 'hospitel with this email already exists' }
  }

  const hashedPassword = bcrypt.hashSync(registerDTO.userPassword, saltRounds)
  const newHospitel = new Hospitel({
    userEmail: registerDTO.userEmail,
    userPassword: hashedPassword,
    name: registerDTO.name,
    totalRooms: registerDTO.totalRooms,
    availableRooms: registerDTO.availableRooms,
    minPrice: registerDTO.minPrice,
    maxPrice: registerDTO.maxPrice,
    imageUrl: registerDTO.imageUrl,
    province: registerDTO.province,
    district: registerDTO.district,
    address: registerDTO.address,
    latitude: registerDTO.latitude,
    longitude: registerDTO.longitude,
  })

  await newHospitel.save()
  newHospitel.set('userPassword', undefined)
  console.log(newHospitel)
  return newHospitel
}
