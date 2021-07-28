export type HospitelDocument = {
    userEmail: string
    userPassword: string
    name: string
    totalRooms: number
    availableRooms: number
    maxPrice: number
    minPrice: number
    imageUrl?: string
    province: string
    district: string
    address?: string
    latitude: number
    longitude: number
    createdAt: string
    updatedAt: string
}