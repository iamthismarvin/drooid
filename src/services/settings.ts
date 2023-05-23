import {
  createDir,
  writeTextFile,
  BaseDirectory,
  readTextFile,
  exists,
} from '@tauri-apps/api/fs'

export interface ConfigData {
  apiKey: string
  model: string
  tokenLimit: number
}

interface WriteFileParams {
  file: string
  data: string
}

const baseDirectory = BaseDirectory.Document
const appFolder = 'Drooid'
export const initConfigData = {
  apiKey: '',
  model: '',
  tokenLimit: 1,
}

export async function writeFile({
  file,
  data,
}: WriteFileParams): Promise<void> {
  await writeTextFile(`${appFolder}/${file}`, data, { dir: baseDirectory })
}

export async function readFile(file: string): Promise<string> {
  return await readTextFile(`${appFolder}/${file}`, { dir: baseDirectory })
}

export async function findFile(file: string): Promise<boolean> {
  return await exists(`${appFolder}/${file}`, { dir: baseDirectory })
}

export async function initConfig(): Promise<void> {
  const configFile = await findFile('config.json')
  const configFolder = await exists(`${appFolder}/`, {
    dir: baseDirectory,
  })

  if (!configFile) {
    // Create app folder if it doesn't exists.
    if (!configFolder) {
      await createDir(appFolder, { dir: baseDirectory, recursive: true })
    }
    // Create file with initial configuration.
    await writeTextFile(
      `${appFolder}/config.json`,
      JSON.stringify(initConfigData),
      {
        dir: baseDirectory,
      }
    )
  }
}

export async function updateConfig(data: ConfigData): Promise<void> {
  await writeFile({ data: JSON.stringify(data), file: 'config.json' })
}

export async function getConfig(): Promise<ConfigData> {
  // Check if config file exists, otherwise throw error.
  const configFile = await findFile('config.json')
  if (configFile) {
    const configData = await readFile('config.json')
    return JSON.parse(configData)
  } else throw new Error('CONFIG_NOT_FOUND')
}
