import bcrypt from 'bcrypt'
import { Hospitel, HospitelDocument } from 'src/hospitel/schema'

export interface RegisterDTO {
  userEmail: string
  userPassword: string
  name: string
  totalRooms: number
  availableRooms: number
  price: {
    maxPrice: number
    minPrice: number
    perDays: number
  }
  imageUrl?: string
  documentUrl?: string
  address: {
    province: string
    district: string
    address?: string
    latitude: number
    longitude: number
  }
  contact: {
    phone: string[]
    social: string[]
  }
  facility: string
  note: string
  coHospital: {
    name: string
    latitude: number
    longitude: number
  }
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
    price: {
      minPrice: registerDTO.price.minPrice,
      maxPrice: registerDTO.price.maxPrice,
      perDays: registerDTO.price.perDays,
    },
    imageUrl: registerDTO.imageUrl,
    documentUrl: registerDTO.documentUrl,
    address: {
      province: registerDTO.address.province,
      district: registerDTO.address.district,
      address: registerDTO.address.address,
      latitude: registerDTO.address.latitude,
      longitude: registerDTO.address.longitude,
    },
    contact: {
      phone: registerDTO.contact.phone,
      social: registerDTO.contact.social,
    },
    facility: registerDTO.facility,
    note: registerDTO.note,
    coHospital: {
      name: registerDTO.coHospital.name,
      latitude: registerDTO.coHospital.latitude,
      longitude: registerDTO.coHospital.longitude,
    },
  })

  await newHospitel.save()
  newHospitel.set('userPassword', undefined)
  console.log(newHospitel)
  return newHospitel
}
