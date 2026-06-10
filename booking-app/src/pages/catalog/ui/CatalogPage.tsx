import { SearchForm } from '@/features/search-rooms/ui/SearchForm'
import { RoomList } from '@/widgets/room-list/ui/RoomList'
import { useRoomStore } from '@/entities/room/model/store'

export function CatalogPage() {
  const rooms = useRoomStore((s) => s.rooms)
  const available = rooms.filter((r) => r.available).length

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Каталог номеров</h1>
        <p className="text-gray-500">
          {rooms.length} номеров · {available} доступно
        </p>
      </div>

      <div className="mb-8">
        <SearchForm />
      </div>

      <RoomList />
    </main>
  )
}
