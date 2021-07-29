export type HospitelDocument = {
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
  imageUrl?: string[]
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
  createdAt: Date
  updatedAt: Date
}

export type HospitelsDocument = {
    _id: string | undefined;
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
    imageUrls?: string[]
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
    createdAt: Date
    updatedAt: Date
}