import type { Room } from '../model/types'
import { formatPrice } from '@/shared/lib/utils'

interface RoomCardProps {
  room: Room
  onBook: (room: Room) => void
}

// ОШИБКА: Имя компонента с МАЛЕНЬКОЙ буквы!
// React воспринимает такой тег как HTML-элемент (<roomcard />, а не компонент)
// При использовании <roomCard room={...} /> в JSX:
//   → Warning: The tag <roomCard> is unrecognized in this browser.
//   → Пропсы вроде `room` не передаются (они игнорируются как неизвестные атрибуты)
//   → Ничего не отображается — компонент не вызывается!
export function roomCard({ room, onBook }: RoomCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200">
      <h3 className="text-lg font-semibold">{room.name}</h3>
      <p className="text-indigo-600 font-bold">{formatPrice(room.price)}</p>
      <button onClick={() => onBook(room)}>Забронировать</button>
    </div>
  )
}

// Этот файл — намеренная демонстрация ошибки!
// Используйте RoomCard (с большой буквы) из ./RoomCard.tsx
