import express, { Request, Response } from 'express'
import multer from 'multer'
import { uploadFile } from 'src/storage'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

const upload = multer()

// TODO: add content type validation
// QUESTION: single or multiple image upload?
router.post(
  '/image',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const url = await uploadFile(`images/${uuidv4()}.jpg`, req.file)
    res.json({ url })
  },
)

// TODO: add content type validation
router.post(
  '/document',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const url = await uploadFile(`documents/${uuidv4()}.pdf`, req.file)
    res.json({ url })
  },
)

export default router
