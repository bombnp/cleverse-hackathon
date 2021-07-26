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
})

const Hospitel = mongoose.model('Hospitel', hospitelSchema)

export { Hospitel }
