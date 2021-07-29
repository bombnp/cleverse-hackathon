import bcrypt from 'bcrypt'
import { HttpError } from 'src/errors'
import { Hospitel } from 'src/hospitel/schema'
import { signJWT } from './jwt'

export interface LoginDTO {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  _id: string
}

export async function login({
  email,
  password,
}: LoginDTO): Promise<LoginResponse> {
  const hospitel = await Hospitel.findOne({
    userEmail: email,
  }).select('userPassword')
  if (!hospitel) {
    throw new HttpError(404, "can't find email")
  }

  if (!bcrypt.compareSync(password, hospitel.userPassword)) {
    throw new HttpError(400, 'invalid password')
  }

  return {
    token: signJWT({ _id: hospitel._id }),
    _id: hospitel._id,
  }
}
