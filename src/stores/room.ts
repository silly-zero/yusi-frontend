import { defineStore } from 'pinia'
import { ref } from 'vue'

export type RoomStatus = 'WAITING' | 'IN_PROGRESS' | 'COMPLETED'

export interface Room {
  code: string
  status: RoomStatus
  scenarioId?: string
  members: string[]
  submissions: Record<string, string>
}

export const useRoomStore = defineStore('room', () => {
  const rooms = ref<Record<string, Room>>({})

  const setRoom = (code: string, room: Room) => {
    rooms.value[code] = room
  }

  const setStatus = (code: string, status: RoomStatus) => {
    if (rooms.value[code]) {
      rooms.value[code].status = status
    }
  }

  const addMember = (code: string, userId: string) => {
    if (rooms.value[code]) {
      const existingMembers = rooms.value[code].members
      rooms.value[code].members = Array.from(new Set([...existingMembers, userId]))
    }
  }

  const addSubmission = (code: string, userId: string, narrative: string) => {
    if (rooms.value[code]) {
      rooms.value[code].submissions[userId] = narrative
    }
  }

  return {
    rooms,
    setRoom,
    setStatus,
    addMember,
    addSubmission
  }
})