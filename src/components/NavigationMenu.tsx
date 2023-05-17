import { type FC } from 'react'
import { NavLink } from 'react-router-dom'
import SettingsIcon from '../assets/icons/SettingsIcon'
import PromptIcon from '../assets/icons/PromptIcon'
import ArchiveIcon from '../assets/icons/ArchiveIcon'

const NAVIGATION_LINKS: Array<{
  path: string
  label: string
  icon: JSX.Element
}> = [
  {
    path: '/',
    label: 'Prompt',
    icon: <PromptIcon />,
  },
  {
    path: '/archive',
    label: 'Archive',
    icon: <ArchiveIcon />,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: <SettingsIcon />,
  },
]

const NavigationMenu: FC = () => {
  return (
    <nav className="bg-eerie flex flex-col p-4 shadow text-white w-36">
      <h1 className="font-bold mb-8 text-center text-xl bg-gradient-to-r from-green-500 via-aureolin to-blue-500 bg-clip-text text-transparent">
        Drooid
      </h1>

      <div className="flex flex-1 flex-col gap-4 mb-8">
        {NAVIGATION_LINKS.map((link, index) => {
          return (
            <NavLink
              to={link.path}
              key={index}
              className="flex flex-col items-center"
            >
              {link.icon}
              <p>{link.label}</p>
            </NavLink>
          )
        })}
      </div>

      <button className="bg-aureolin font-bold p-1 rounded text-night w-full">
        <a
          href="https://github.com/iamthismarvin/drooid"
          rel="noreferrer noopener"
          target="_blank"
        >
          GitHub
        </a>
      </button>
    </nav>
  )
}

export default NavigationMenu
