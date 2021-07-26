import { Hospitel } from './schema'
export async function setHostpitel(req: any) {
  const hospitel = new Hospitel({
    userID: req.body.userID,
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.url,
    province: req.body.province,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  })

  const res = await hospitel.save()
  return res
}
