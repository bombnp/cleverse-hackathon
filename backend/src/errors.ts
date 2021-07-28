import { NextFunction, Request, Response } from 'express'

export class HttpError {
  constructor(public status: number, public message: string) {}
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpError) {
    if (err.status >= 500) {
      console.error(err)
    }
    res.status(err.status).json(err)
  } else {
    console.error(err)
    res.status(500).json(err)
  }
}
