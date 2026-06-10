import { useState } from 'react'
import { z } from 'zod'
import type { Room } from '@/entities/room/model/types'
import { useBookingStore } from '@/entities/booking/model/store'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { formatPrice, calcNights } from '@/shared/lib/utils'

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Минимум 2 символа'),
  guestEmail: z.string().email('Неверный email'),
  checkIn: z.string().min(1, 'Укажите дату заезда'),
  checkOut: z.string().min(1, 'Укажите дату выезда'),
  guests: z.coerce.number().min(1, 'Минимум 1 гость'),
})

type FormData = z.infer<typeof bookingSchema>
type FormErrors = Partial<Record<keyof FormData, string>>

interface BookRoomFormProps {
  room: Room
  onSuccess: () => void
  onCancel: () => void
}

export function BookRoomForm({ room, onSuccess, onCancel }: BookRoomFormProps) {
  const addBooking = useBookingStore((s) => s.addBooking)

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86_400_000).toISOString().split('T')[0]

  const [form, setForm] = useState<FormData>({
    guestName: '',
    guestEmail: '',
    checkIn: today,
    checkOut: tomorrow,
    guests: 1,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const nights = calcNights(form.checkIn, form.checkOut)
  const total = room.price * nights

  function handleChange(field: keyof FormData, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = bookingSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormData
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    addBooking({
      id: `b${Date.now()}`,
      roomId: room.id,
      ...result.data,
      totalPrice: total,
      status: 'confirmed',
      createdAt: today,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Бронирование подтверждено!</h3>
        <p className="text-gray-500 mb-6">
          {room.name} · {nights} ночей · {formatPrice(total)}
        </p>
        <Button onClick={onSuccess}>Отлично!</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-indigo-50 rounded-xl p-4 mb-2">
        <p className="font-semibold text-indigo-900">{room.name}</p>
        <p className="text-sm text-indigo-600">{formatPrice(room.price)} / ночь</p>
      </div>

      <Input
        label="Ваше имя"
        placeholder="Иван Иванов"
        value={form.guestName}
        onChange={(e) => handleChange('guestName', e.target.value)}
        error={errors.guestName}
      />
      <Input
        label="Email"
        type="email"
        placeholder="ivan@example.com"
        value={form.guestEmail}
        onChange={(e) => handleChange('guestEmail', e.target.value)}
        error={errors.guestEmail}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Заезд"
          type="date"
          value={form.checkIn}
          min={today}
          onChange={(e) => handleChange('checkIn', e.target.value)}
          error={errors.checkIn}
        />
        <Input
          label="Выезд"
          type="date"
          value={form.checkOut}
          min={form.checkIn}
          onChange={(e) => handleChange('checkOut', e.target.value)}
          error={errors.checkOut}
        />
      </div>

      <Input
        label="Количество гостей"
        type="number"
        min={1}
        max={room.capacity}
        value={form.guests}
        onChange={(e) => handleChange('guests', e.target.value)}
        error={errors.guests}
      />

      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{nights} ночей</p>
          <p className="text-xl font-bold text-indigo-600">{formatPrice(total)}</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit">Забронировать</Button>
        </div>
      </div>
    </form>
  )
}
