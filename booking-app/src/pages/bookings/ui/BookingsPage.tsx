import { useBookingStore } from '@/entities/booking/model/store'
import { BookingCard } from '@/entities/booking/ui/BookingCard'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'

export function BookingsPage() {
  const bookings = useBookingStore((s) => s.bookings)
  const cancelBooking = useBookingStore((s) => s.cancelBooking)

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Мои бронирования</h1>
          <p className="text-gray-500">{bookings.length} записей</p>
        </div>
        <Link to="/catalog">
          <Button variant="secondary">+ Новое бронирование</Button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-lg mb-4">Нет бронирований</p>
          <Link to="/catalog">
            <Button>Выбрать номер</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={cancelBooking}
            />
          ))}
        </div>
      )}
    </main>
  )
}
