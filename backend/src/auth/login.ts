import { Hospitel } from 'src/hospitel/schema'
import { signJWT } from './jwt'

export interface LoginDTO {
  email: string
  password: string
}

export async function login({ email, password }: LoginDTO): Promise<string> {
  const hospitel = await Hospitel.findOne({
    userEmail: email,
    userPassword: password,
  })
  if (!hospitel) {
    throw new Error("can't find hospitel")
  }
  return signJWT({ userId: hospitel._id })
}
