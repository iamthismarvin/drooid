import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

const App: FC = () => {
  const [greetMsg, setGreetMsg] = useState('')

  useEffect(() => {
    void greet('Drooid')
  }, [])

  async function greet (name: string): Promise<void> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }))
  }

  return (
    <div>
      <h1 className="font-bold">{greetMsg}</h1>
    </div>
  )
}

export default App
