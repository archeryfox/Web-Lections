export type RoomCategory = 'economy' | 'standard' | 'deluxe' | 'apartment' | 'suite' | 'family'

export interface Room {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  amenities: string[]
  imageUrl: string
  available: boolean
  category: RoomCategory
}
