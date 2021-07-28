import { Subscription } from './schema'
export async function setSubscription(req: any) {
  const subscription = new Subscription({
    userEmail: req.body.userEmail,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  })

  const res = await subscription.save()
  return res
}
