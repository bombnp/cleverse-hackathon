import { HospitelDocument } from './schema'

export function sanitizeHospitel(hospitel: HospitelDocument): HospitelDocument {
  delete hospitel.userPassword
  return hospitel
}

export function sanitizeHospitels(
  hospitels: HospitelDocument[],
): HospitelDocument {
  for (const hospitel of hospitels) {
    delete hospitel.userPassword
  }
  return hospitels
}
