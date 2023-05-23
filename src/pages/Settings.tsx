import { useState, type FC, useEffect } from 'react'
import {
  initConfig,
  getConfig as getConfigService,
  updateConfig,
  type ConfigData,
  initConfigData,
} from '../services/settings'
import Input from '../components/Input'
import truncate from '../utils/truncate'

const Settings: FC = () => {
  const [configData, setConfigData] = useState<ConfigData>(initConfigData)
  const [tempConfigData, setTempConfigData] =
    useState<ConfigData>(initConfigData)

  // // Load current config values into inputs.
  useEffect(() => {
    async function init(): Promise<void> {
      await getConfig()
    }
    void init()
  }, [])

  const [showGetConfigError, setShowGetConfigError] = useState(false)
  const [showSaveConfigMessage, setShowSaveConfigMessage] = useState(false)
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  async function getConfig(): Promise<void> {
    if (showGetConfigError) setShowGetConfigError(false)
    try {
      const configData = await getConfigService()
      setConfigData(configData)
      setTempConfigData(configData)
    } catch (error) {
      console.error(error)
      setShowGetConfigError(true)
    } finally {
      setShowApiKeyInput(false)
    }
  }

  async function saveConfig(): Promise<void> {
    try {
      await updateConfig(tempConfigData)
      setShowSaveConfigMessage(true)
      setConfigData(tempConfigData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="gap-4 grid grid-cols-2 mb-6">
        {!showApiKeyInput ? (
          <div>
            <p>API Key</p>
            <div className="flex justify-between">
              <p>{truncate(configData.apiKey)}</p>
              <button
                onClick={() => {
                  setShowApiKeyInput(true)
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <Input
            label="API Key"
            type="text"
            value={tempConfigData.apiKey}
            onChange={(e) => {
              setTempConfigData({ ...tempConfigData, apiKey: e.target.value })
            }}
          />
        )}

        <Input
          label="Model"
          type="text"
          value={tempConfigData.model}
          onChange={(e) => {
            setTempConfigData({ ...tempConfigData, model: e.target.value })
          }}
        />
        <Input
          label="Token Limit"
          type="number"
          value={tempConfigData.tokenLimit}
          onChange={(e) => {
            setTempConfigData({
              ...tempConfigData,
              tokenLimit: Number(e.target.value),
            })
          }}
        />
      </div>
      <div>
        <button
          onClick={saveConfig}
          disabled={
            JSON.stringify(configData) === JSON.stringify(tempConfigData)
          }
        >
          Save Config
        </button>
      </div>
      {showGetConfigError && (
        <p className="text-red-500">File [config.json] not found.</p>
      )}
      {showSaveConfigMessage && (
        <p className="text-green-500">Configuration saved!</p>
      )}

      {/* DEV ONLY */}
      <div className="bg-blue-500 p-4 rounded-xl mt-8">
        <p className="mb-2">DEV BUTTONS</p>
        <button onClick={initConfig}>Create Config</button>
        <button className="ml-2" onClick={getConfig}>
          Get Config
        </button>
      </div>
    </div>
  )
}

export default Settings
