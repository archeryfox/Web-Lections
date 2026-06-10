import { create } from 'zustand'
import type { Booking } from './types'
import { MOCK_BOOKINGS } from '@/shared/api/mockData'

interface BookingStore {
  bookings: Booking[]
  addBooking: (booking: Booking) => void
  cancelBooking: (id: string) => void
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: MOCK_BOOKINGS,

  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),

  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status: 'cancelled' as const } : b
      ),
    })),
}))
