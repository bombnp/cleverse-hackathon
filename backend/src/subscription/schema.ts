import mongoose from 'mongoose'
const Schema = mongoose.Schema

const subscriptionSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
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
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export { Subscription }
