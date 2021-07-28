import { Hospitel } from 'src/hospitel/schema'
import { Subscription } from './schema'
import { sendEmail } from './sendemail'

export async function nearestAlert() {
  const subsription = await Subscription.find()
  const hospitel = await Hospitel.find({ availableRooms: { $gte: 0 } })
  for (let h of hospitel) {
    let reciever: string[] = []
    for (let s of subsription) {
      if (
        distance(
          h.address.latitude,
          h.address.longitude,
          s.latitude,
          s.longitude,
          'K',
        ) <= 10
      ) {
        reciever.push(s.userEmail)
      }
    }
    if (reciever != []) {
      await sendEmail(reciever, h)
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
  return dist
}
