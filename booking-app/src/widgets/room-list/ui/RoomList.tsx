import { useState } from 'react'
import { useRoomStore } from '@/entities/room/model/store'
import { RoomCard } from '@/entities/room/ui/RoomCard'
import type { Room } from '@/entities/room/model/types'
import { BookRoomForm } from '@/features/book-room/ui/BookRoomForm'

export function RoomList() {
  const getAvailable = useRoomStore((s) => s.getAvailable)
  const rooms = getAvailable()

  const [bookingRoom, setBookingRoom] = useState<Room | null>(null)

  if (bookingRoom) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Оформить бронирование</h2>
          <BookRoomForm
            room={bookingRoom}
            onSuccess={() => setBookingRoom(null)}
            onCancel={() => setBookingRoom(null)}
          />
        </div>
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-lg">Номера не найдены</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        // Правильно: используем RoomCard с ЗАГЛАВНОЙ буквы
        <RoomCard key={room.id} room={room} onBook={setBookingRoom} />
      ))}
    </div>
  )
}
