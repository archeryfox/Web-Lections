import { useRoomStore } from '@/entities/room/model/store'
import { Input } from '@/shared/ui/Input'

export function SearchForm() {
  const searchQuery = useRoomStore((s) => s.searchQuery)
  const setSearchQuery = useRoomStore((s) => s.setSearchQuery)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Найти номер</h2>
      <Input
        label="Поиск"
        placeholder="Введите название или тип номера…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
