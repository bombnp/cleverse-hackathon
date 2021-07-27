import dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = process.env.MONGO_URI
export const PORT = process.env.PORT

export const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID
export const ONESIGNAL_AUTH_TOKEN = process.env.ONESIGNAL_AUTH_TOKEN
