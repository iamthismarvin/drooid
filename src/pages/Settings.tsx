import { useState, type FC, useContext, useEffect } from 'react'
import {
  updateConfig,
  type ConfigData,
  initConfigData,
} from '../services/settings'
import Input from '../components/Input'
import truncate from '../utils/truncate'
import { SettingsContext } from '../store/Settings'

const Settings: FC = () => {
  const { configData, setConfigData } = useContext(SettingsContext)
  const [tempConfigData, setTempConfigData] =
    useState<ConfigData>(initConfigData)

  // Load current config values into inputs.
  useEffect(() => {
    setTempConfigData(configData)
  }, [])

  const [showSaveConfigMessage, setShowSaveConfigMessage] = useState(false)
  const [showApiKeyInput, setShowApiKeyInput] = useState(
    configData.apiKey.length < 1
  )

  async function saveConfig(): Promise<void> {
    try {
      await updateConfig(tempConfigData)
      setShowSaveConfigMessage(true)
      setConfigData(tempConfigData)
    } catch (error) {
      console.error(error)
    } finally {
      setShowApiKeyInput(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="gap-4 grid grid-cols-2 mb-6">
        {!showApiKeyInput ? (
          <div>
            <p>API Key</p>
            <div className="flex h-10 items-center justify-between">
              <p className="px-2">{truncate(configData.apiKey)}</p>
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
      {showSaveConfigMessage && (
        <p className="text-green-500">Configuration saved!</p>
      )}
    </div>
  )
}

export default Settings
