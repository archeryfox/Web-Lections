import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../ui/Layout'
import { HomePage } from '@/pages/home/ui/HomePage'
import { CatalogPage } from '@/pages/catalog/ui/CatalogPage'
import { BookingsPage } from '@/pages/bookings/ui/BookingsPage'
import { NamingDemoPage } from '@/pages/naming-demo/ui/NamingDemoPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'naming-demo', element: <NamingDemoPage /> },
    ],
  },
])
