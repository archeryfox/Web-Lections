import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header/ui/Header'

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
    </div>
  )
}
