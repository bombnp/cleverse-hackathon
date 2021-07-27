import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { login, LoginDTO } from 'src/auth/login'
import { register, RegisterDTO } from 'src/auth/register'
import { RequestWithUser } from 'src/types/express'

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/login', async (req: Request<{}, {}, LoginDTO>, res: Response) => {
  const body = req.body
  if (!body.email || !body.password) {
    return res.status(400).json({
      error: 'email and/or password is missing',
    })
  }
  const token = await login({ email: body.email, password: body.password })
  res.status(201).json({ token })
})

router.post(
  '/register',
  async (
    req: Request<{}, {}, RegisterDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const body = req.body
    try {
      const hospitel = await register(body)
      res.status(201).json(hospitel)
    } catch (err) {
      next(err)
    }
  },
)

// routes below this are protected
router.use(passport.authenticate('jwt', { session: false }))

router.get('/me', async (req: RequestWithUser, res: Response) => {
  res.status(200).json(req.user)
})

export default router
