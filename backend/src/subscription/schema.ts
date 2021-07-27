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

export type SubscriptionDocument = mongoose.Document & {
  userEmail: string
  latitude: number
  longitude: number
  createdAt: Date
}

const Subscription = mongoose.model<SubscriptionDocument>(
  'Subscription',
  subscriptionSchema,
)

export { Subscription }
