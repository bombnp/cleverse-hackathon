import bcrypt from 'bcrypt'
import { Hospitel } from 'src/hospitel/schema'
import { signJWT } from './jwt'

export interface LoginDTO {
  email: string
  password: string
}

export async function login({ email, password }: LoginDTO): Promise<string> {
  const hospitel = await Hospitel.findOne({
    userEmail: email,
  }).select('userPassword')
  if (!hospitel) {
    throw { status: 404, message: "can't find email" }
  }

  if (!bcrypt.compareSync(password, hospitel.userPassword)) {
    throw { status: 400, message: 'invalid password' }
  }

  return signJWT({ userId: hospitel._id })
}
