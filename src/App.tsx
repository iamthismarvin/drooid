import { type FC } from 'react'
import { useRoutes } from 'react-router-dom'
import Archive from './pages/Archive'
import Prompt from './pages/Prompt'
import Settings from './pages/Settings'
import Layout from './layout'
import { SettingsProvider } from './store/Settings'

const router = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Prompt />,
      },
      {
        path: '/archive',
        element: <Archive />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]

const App: FC = () => {
  const routes = useRoutes(router)

  return <SettingsProvider>{routes}</SettingsProvider>
}

export default App
