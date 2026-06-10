export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Booking {
  id: string
  roomId: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
}
