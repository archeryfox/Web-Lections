import { useState } from 'react'
import { RoomCard } from '@/entities/room/ui/RoomCard'
import { roomCard } from '@/entities/room/ui/roomCardBad'
import { MOCK_ROOMS } from '@/shared/api/mockData'

const demoRoom = MOCK_ROOMS[0]

export function NamingDemoPage() {
  const [showLowerWarning, setShowLowerWarning] = useState(false)

  // Вызываем lowercase-компонент как ФУНКЦИЮ (единственный способ заставить его работать)
  const LowercaseAsFunction = roomCard

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        ⚠️ Демо: Именование компонентов
      </h1>
      <p className="text-gray-500 mb-8">
        React различает компоненты по регистру первой буквы имени.
        Это фундаментальное правило JSX.
      </p>

      {/* Правило */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-amber-900 mb-3 text-lg">📌 Правило JSX</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <p className="text-xs font-mono text-green-600 uppercase tracking-wider mb-2">✅ Компонент React</p>
            <code className="text-sm text-gray-800 font-mono block">
              {`function RoomCard() { ... }`}<br />
              <span className="text-green-700 font-bold">{`<RoomCard />`}</span><br />
              <span className="text-gray-400 text-xs">← Вызывает функцию, рендерит JSX</span>
            </code>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-200">
            <p className="text-xs font-mono text-red-600 uppercase tracking-wider mb-2">❌ HTML-элемент (ошибка)</p>
            <code className="text-sm text-gray-800 font-mono block">
              {`function roomCard() { ... }`}<br />
              <span className="text-red-700 font-bold">{`<roomCard />`}</span><br />
              <span className="text-gray-400 text-xs">← Создаёт DOM-элемент, не вызывает функцию</span>
            </code>
          </div>
        </div>
      </div>

      {/* Визуализация ошибки */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-red-900 mb-1 text-lg">Что происходит при &lt;roomCard /&gt;</h2>
        <p className="text-red-700 text-sm mb-4">
          Откройте DevTools → Console и нажмите кнопку ниже
        </p>
        <button
          onClick={() => setShowLowerWarning(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer mb-4"
        >
          Показать предупреждение в консоли
        </button>

        {showLowerWarning && (
          <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs space-y-2">
            <p className="text-yellow-400">
              Warning: The tag {'<roomcard>'} is unrecognized in this browser.
            </p>
            <p className="text-yellow-300 pl-4">
              If you intentionally want it to appear in the DOM as a custom element,
              spell it as lowercase {'<roomcard>'} instead.
            </p>
            <p className="text-red-400">
              If you accidentally passed a string, escape it so it doesn't get interpreted
              as a component name.
            </p>
            <p className="text-gray-500 mt-3">
              ↑ Именно такое предупреждение даёт React, если написать {'<roomCard room={...} />'}
            </p>
            <p className="text-gray-500">
              Пропсы вроде `room` и `onBook` игнорируются — компонент не вызывается!
            </p>
          </div>
        )}
      </div>

      {/* Сравнение рендера */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Сравнение рендера</h2>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {/* Правильный вариант */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
            <h3 className="font-semibold text-green-800">RoomCard (заглавная)</h3>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 mb-3 font-mono text-xs text-gray-300">
            <span className="text-blue-400">import</span>
            {' { '}<span className="text-green-400">RoomCard</span>{' } '}
            <span className="text-blue-400">from</span>
            <span className="text-orange-300"> './RoomCard'</span><br />
            <span className="text-purple-400">{'// ...'}</span><br />
            {'<'}<span className="text-green-400 font-bold">RoomCard</span>
            {' room={demoRoom} onBook={fn} />'}
          </div>
          {/* Реальный рендер компонента */}
          <div className="border-2 border-green-200 rounded-2xl overflow-hidden">
            <RoomCard room={demoRoom} onBook={() => {}} />
          </div>
        </div>

        {/* Ошибочный вариант */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">✗</span>
            <h3 className="font-semibold text-red-800">roomCard (строчная)</h3>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 mb-3 font-mono text-xs text-gray-300">
            <span className="text-blue-400">import</span>
            {' { '}<span className="text-red-400">roomCard</span>{' } '}
            <span className="text-blue-400">from</span>
            <span className="text-orange-300"> './roomCard'</span><br />
            <span className="text-purple-400">{'// ...'}</span><br />
            {'<'}<span className="text-red-400 font-bold">roomCard</span>
            {' room={demoRoom} onBook={fn} />'}
          </div>
          {/* Правильный способ: вызываем как функцию через alias с заглавной */}
          <div className="border-2 border-red-200 rounded-2xl overflow-hidden">
            <LowercaseAsFunction room={demoRoom} onBook={() => {}} />
          </div>
          <p className="text-xs text-red-600 mt-2 bg-red-50 rounded-lg p-2">
            Выше — рендер через вызов как функции (хак для демо).
            Если написать <code className="bg-red-100 px-1 rounded">{'<roomCard />'}</code> напрямую,
            React создаст неизвестный DOM-тег, пропсы потеряются, ничего не отобразится.
          </p>
        </div>
      </div>

      {/* Объяснение причины */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="font-bold text-blue-900 mb-3 text-lg">Почему так работает?</h2>
        <div className="space-y-3 text-sm text-blue-800">
          <p>
            JSX компилируется в JavaScript. Запись <code className="bg-blue-100 px-1 rounded">{'<RoomCard />'}</code> превращается в:
          </p>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300">
            React.createElement(<span className="text-green-400">RoomCard</span>, null)
            <span className="text-gray-500"> // ← передаёт ссылку на функцию</span>
          </div>
          <p>
            А <code className="bg-red-100 px-1 rounded">{'<roomCard />'}</code> превращается в:
          </p>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300">
            React.createElement(<span className="text-red-400">"roomcard"</span>, null)
            <span className="text-gray-500"> // ← строка = HTML тег!</span>
          </div>
          <p className="font-medium">
            Заглавная буква = ссылка на функцию-компонент.<br />
            Строчная буква = строка с именем DOM-элемента.
          </p>
        </div>
      </div>
    </main>
  )
}
