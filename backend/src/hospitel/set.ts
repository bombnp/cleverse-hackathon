import { Hospitel } from './schema'
export async function setHostpitel(req: any) {
  console.log(req.body)
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
  console.log(hospitel)
  const res = await hospitel.save()
  return hospitel
}
