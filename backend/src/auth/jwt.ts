import jwt from 'jsonwebtoken'
import passport from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { JWT_SECRET } from 'src/config'
import { getHostpitelbyID } from 'src/hospitel/get'

interface JWTPayload {
  _id: string
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
  })
}

export function verifyJWT(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload
}

passport.use(
  new JWTStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload: JWTPayload, done) => {
      const user = await getHostpitelbyID(payload._id)
      done(null, user)
    },
  ),
)
