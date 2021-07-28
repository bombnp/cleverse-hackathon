import { Hospitel } from 'src/hospitel/schema'
import { Subscription } from './schema'

// TODO: add logic
export async function nearestAlert() {
  const subsription = await Subscription.find()
  const hospital = await Hospitel.find()
  for (const h of hospital) {
    for (const s of subsription) {
      if (
        distance(h.latitude, h.longitude, s.latitude, s.longitude, 'K') < 10
      ) {
        console.log(s)
      }
    }
  }
  return subsription
}

export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: string,
) {
  var radlat1 = (Math.PI * lat1) / 180
  var radlat2 = (Math.PI * lat2) / 180
  var theta = lon1 - lon2
  var radtheta = (Math.PI * theta) / 180
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == 'K') {
    dist = dist * 1.609344
  }
  if (unit == 'N') {
    dist = dist * 0.8684
  }
  console.log(dist)
  return dist
}
