import {
  type FC,
  type ReactNode,
  useEffect,
  useState,
  createContext,
} from 'react'
import {
  type ConfigData,
  initConfigData,
  getConfig,
  initConfig,
} from '../services/settings'

const SettingsContext = createContext<{
  configData: ConfigData
  setConfigData: React.Dispatch<React.SetStateAction<ConfigData>>
}>({ configData: initConfigData, setConfigData: () => {} })

const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [configData, setConfigData] = useState<ConfigData>(initConfigData)

  useEffect(() => {
    async function init(): Promise<void> {
      await initConfig()
      await loadConfig()
    }
    void init()
  }, [])

  async function loadConfig(): Promise<void> {
    // if (showGetConfigError) setShowGetConfigError(false)
    try {
      const config = await getConfig()
      setConfigData(config)
    } catch (error) {
      console.error(error)
      // setShowGetConfigError(true)
    }
    // finally {
    //   setShowApiKeyInput(false)
    // }
  }

  const settingsContextValue = {
    configData,
    setConfigData,
  }

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }
