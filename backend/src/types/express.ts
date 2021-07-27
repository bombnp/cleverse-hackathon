import { Request } from 'express'
import { HospitelDocument } from 'src/hospitel/schema'

export type RequestWithUser = Request & {
  user: HospitelDocument
}
