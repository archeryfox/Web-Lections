import { create } from 'zustand'
import type { Room } from './types'
import { MOCK_ROOMS } from '@/shared/api/mockData'

interface RoomStore {
  rooms: Room[]
  selectedRoom: Room | null
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectRoom: (room: Room | null) => void
  getAvailable: () => Room[]
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: MOCK_ROOMS,
  selectedRoom: null,
  searchQuery: '',

  setSearchQuery: (q) => set({ searchQuery: q }),
  selectRoom: (room) => set({ selectedRoom: room }),

  getAvailable: () => {
    const { rooms, searchQuery } = get()
    return rooms.filter((r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  },
}))
