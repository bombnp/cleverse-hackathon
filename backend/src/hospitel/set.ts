import { Hospitel } from './schema'
export async function setHostpitel(req: any) {
  const hospitel = new Hospitel({
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
    name: req.body.name,
    totalRooms: req.body.totalRooms,
    availableRooms: req.body.availableRooms,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
    imageUrl: req.body.url,
    province: req.body.province,
    district: req.body.district,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    createdAt: Date.now(),
  })

  const res = await hospitel.save()
  return res
}
