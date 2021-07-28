import { Storage } from '@google-cloud/storage'
import { SERVICE_ACCOUNT_KEY_PATH } from './config'

const storage = new Storage({ keyFilename: SERVICE_ACCOUNT_KEY_PATH })

function getFileUrl(filename: string): string {
  return `https://storage.googleapis.com/hospitel-public/${filename}`
}

export async function uploadFile(
  filename: string,
  file: Express.Multer.File,
): Promise<string> {
  const gcsFile = storage.bucket('hospitel-public').file(filename)

  await gcsFile.save(file.buffer, {
    contentType: file.mimetype,
  })

  return getFileUrl(filename)
}
