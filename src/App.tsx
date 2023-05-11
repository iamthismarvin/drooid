import { type FC } from 'react'
import { useRoutes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Prompt from './pages/Prompt'
import Settings from './pages/Settings'
import Layout from './layout'

const router = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/prompt',
        element: <Prompt />,
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

  return <>{routes}</>
}

export default App
