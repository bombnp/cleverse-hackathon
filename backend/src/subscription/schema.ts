import mongoose from 'mongoose'
const Schema = mongoose.Schema

const subscriptionSchema = new Schema(
  {
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
  },
  { timestamps: true },
)

export type SubscriptionDocument = mongoose.Document & {
  userEmail: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
}

const Subscription = mongoose.model<SubscriptionDocument>(
  'Subscription',
  subscriptionSchema,
)

export { Subscription }
