import type { Room } from '../model/types'
import { Button } from '@/shared/ui/Button'
import { formatPrice } from '@/shared/lib/utils'

interface RoomCardProps {
  room: Room
  onBook: (room: Room) => void
}

// ПРАВИЛЬНО: Имя компонента с ЗАГЛАВНОЙ буквы → React знает, что это компонент
export function RoomCard({ room, onBook }: RoomCardProps) {
  const categoryColors: Record<string, string> = {
    economy: 'bg-green-100 text-green-800',
    standard: 'bg-blue-100 text-blue-800',
    deluxe: 'bg-purple-100 text-purple-800',
    apartment: 'bg-orange-100 text-orange-800',
    suite: 'bg-yellow-100 text-yellow-800',
    family: 'bg-pink-100 text-pink-800',
  }

  const categoryLabels: Record<string, string> = {
    economy: 'Эконом', standard: 'Стандарт', deluxe: 'Делюкс',
    apartment: 'Апартаменты', suite: 'Люкс', family: 'Семейный',
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={room.imageUrl}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
        {!room.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Занято
            </span>
          </div>
        )}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[room.category]}`}>
          {categoryLabels[room.category]}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-indigo-600">{formatPrice(room.price)}</p>
            <p className="text-xs text-gray-500">за ночь</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{room.description}</p>

        <div className="flex items-center gap-1 mb-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
          </svg>
          <span className="text-sm text-gray-500">до {room.capacity} гостей</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.amenities.slice(0, 4).map((a) => (
            <span key={a} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">
              {a}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md">
              +{room.amenities.length - 4}
            </span>
          )}
        </div>

        <Button
          onClick={() => onBook(room)}
          disabled={!room.available}
          className="w-full"
        >
          {room.available ? 'Забронировать' : 'Недоступно'}
        </Button>
      </div>
    </div>
  )
}
