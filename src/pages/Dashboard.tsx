import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

const Dashboard: FC = () => {
  const [greetMsg, setGreetMsg] = useState('')

  useEffect(() => {
    void greet('Drooid')
  }, [])

  async function greet(name: string): Promise<void> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }))
  }
  return (
    <div>
      <div>Dashboard</div>
      <p>{greetMsg}</p>
    </div>
  )
}

export default Dashboard
