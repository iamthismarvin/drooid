import { getConfig } from './settings'

export async function queryChat(text: string): Promise<string> {
  const configData = await getConfig()
  const { apiKey, model } = configData

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: queryChatBuilder(text),
      }),
    }
  )
  const result = await response.json()
  return queryChatCleaner(result[0].generated_text)
}

function queryChatBuilder(text: string): string {
  return `<|prompter|>${text}<|endoftext|><|assistant|>`
}

function queryChatCleaner(text: string): string {
  const response = text.split('<|assistant|>')
  return response[1]
}
