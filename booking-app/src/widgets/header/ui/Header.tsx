import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Номера' },
  { to: '/bookings', label: 'Мои брони' },
  { to: '/naming-demo', label: '⚠️ Демо: Именование' },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600 shrink-0">
          <span className="text-2xl">🏨</span>
          <span>StayBook</span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${pathname === to
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
