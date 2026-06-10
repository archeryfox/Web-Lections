import type { Booking } from '../model/types'
import { Button } from '@/shared/ui/Button'
import { formatPrice, formatDate, calcNights } from '@/shared/lib/utils'
import { MOCK_ROOMS } from '@/shared/api/mockData'

interface BookingCardProps {
  booking: Booking
  onCancel: (id: string) => void
}

const statusConfig = {
  pending: { label: 'Ожидает', className: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Подтверждено', className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменено', className: 'bg-red-100 text-red-800' },
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const room = MOCK_ROOMS.find((r) => r.id === booking.roomId)
  const nights = calcNights(booking.checkIn, booking.checkOut)
  const status = statusConfig[booking.status]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {room && (
        <img src={room.imageUrl} alt={room.name} className="w-full h-40 object-cover" />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Бронирование #{booking.id}</p>
            <h3 className="text-base font-semibold text-gray-900">
              {room?.name ?? 'Номер'}
            </h3>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
            {status.label}
          </span>
        </div>

        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
          <p><span className="font-medium">Гость:</span> {booking.guestName}</p>
          <p><span className="font-medium">Заезд:</span> {formatDate(booking.checkIn)}</p>
          <p><span className="font-medium">Выезд:</span> {formatDate(booking.checkOut)}</p>
          <p><span className="font-medium">Ночей:</span> {nights}</p>
          <p><span className="font-medium">Гостей:</span> {booking.guests}</p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="font-bold text-indigo-600 text-lg">{formatPrice(booking.totalPrice)}</p>
          {booking.status !== 'cancelled' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancel(booking.id)}
            >
              Отменить
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
