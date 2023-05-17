import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavigationMenu from './components/NavigationMenu'

const Layout: FC = () => {
  return (
    <>
      <div className="flex bg-night text-white min-h-screen h-full">
        <NavigationMenu />
        <main className="h-full w-full">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
