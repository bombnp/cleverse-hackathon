import mongoose from 'mongoose'
const Schema = mongoose.Schema

const hospitelSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    availableRooms: {
      type: Number,
      required: true,
    },
    price: {
      maxPrice: {
        type: Number,
        required: true,
      },
      minPrice: {
        type: Number,
        required: true,
      },
      perDays: {
        type: Number,
        required: true,
      },
    },
    imageUrls: {
      type: [String],
    },
    documentUrl: {
      type: String,
    },
    address: {
      province: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    contact: {
      phone: {
        type: [String],
      },
      social: {
        type: [String],
      },
    },
    facility: {
      type: String,
    },
    note: {
      type: String,
    },
    coHospital: {
      name: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
  { timestamps: true },
)

export type HospitelDocument = mongoose.Document & {
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

const Hospitel = mongoose.model<HospitelDocument>('Hospitel', hospitelSchema)

export { Hospitel }
