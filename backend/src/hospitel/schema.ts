import mongoose from 'mongoose'
const Schema = mongoose.Schema

const hospitelSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
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
  maxPrice: {
    type: Number,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
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
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
})

const Hospitel = mongoose.model('Hospitel', hospitelSchema)

export { Hospitel }
