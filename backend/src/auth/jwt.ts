import jwt from 'jsonwebtoken'
import { JWT_SECRET } from 'src/config'

interface JWTPayload {
  userId: string
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
  })
}

export function verifyJWT(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload
}
