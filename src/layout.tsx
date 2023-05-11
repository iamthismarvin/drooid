import { type FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navigation: FC = () => {
  return (
    <nav className="bg-eerie shadow p-4 text-white">
      <h1 className="font-bold mb-4 text-xl">Drooid</h1>

      <div className="flex flex-col mb-4">
        <Link to={'/'}>Dashboard</Link>
        <Link to={'/prompt'}>Prompt</Link>
        <Link to={'/settings'}>Settings</Link>
      </div>

      <button className="bg-aureolin text-night p-1 rounded w-full font-bold">
        Help
      </button>
    </nav>
  )
}

const Layout: FC = () => {
  return (
    <>
      <div className="flex bg-night text-white min-h-screen h-full">
        <Navigation />
        <main className="h-full p-4 w-full">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
