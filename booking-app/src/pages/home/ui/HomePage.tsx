import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'

export function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <p className="text-sm font-medium text-indigo-600 tracking-widest uppercase mb-4">
          FSD · React · TypeScript · Tailwind · Zustand
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Онлайн-букеринг<br />
          <span className="text-indigo-600">по Feature-Sliced Design</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Учебный проект по лекциям. Демонстрирует архитектуру FSD,
          Zustand, Zod-валидацию и ошибку именования компонентов.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/catalog">
            <Button size="lg">Смотреть номера</Button>
          </Link>
          <Link to="/naming-demo">
            <Button size="lg" variant="secondary">⚠️ Демо: Именование</Button>
          </Link>
        </div>
      </section>

      {/* FSD Layers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Архитектура FSD — «тортик»
        </h2>
        <div className="flex flex-col items-center gap-1">
          {[
            { name: 'app', desc: 'Роутинг, провайдеры, глобальные стили', color: 'bg-red-500', width: 'w-[40%]' },
            { name: 'pages', desc: 'Страницы: Home, Catalog, Bookings', color: 'bg-orange-500', width: 'w-[52%]' },
            { name: 'widgets', desc: 'Header, RoomList', color: 'bg-yellow-500', width: 'w-[64%]' },
            { name: 'features', desc: 'BookRoomForm, SearchForm', color: 'bg-green-500', width: 'w-[76%]' },
            { name: 'entities', desc: 'Room, Booking (модели + UI)', color: 'bg-blue-500', width: 'w-[88%]' },
            { name: 'shared', desc: 'Button, Input, utils, mockData', color: 'bg-purple-500', width: 'w-[100%]' },
          ].map((layer) => (
            <div
              key={layer.name}
              className={`${layer.width} ${layer.color} text-white rounded-xl px-5 py-3
                flex items-center justify-between gap-4 shadow transition-transform hover:-translate-y-0.5`}
            >
              <code className="font-mono font-bold text-sm">{layer.name}/</code>
              <span className="text-xs opacity-90 text-right">{layer.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          Зависимости текут только вниз ↓ — верхние слои импортируют нижние, но не наоборот
        </p>
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: '🏨', title: 'Каталог номеров', desc: 'Zustand store, поиск, фильтрация по доступности' },
          { icon: '📋', title: 'Zod-валидация', desc: 'Форма брони с валидацией схемы и подсветкой ошибок' },
          { icon: '⚠️', title: 'Демо ошибки', desc: 'Наглядно: <roomCard> vs <RoomCard> — в чём разница' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-3xl mb-3">{icon}</p>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
