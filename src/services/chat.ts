// import { getConfig } from './settings'

import { HfInference } from '@huggingface/inference'
import { getConfig } from './settings'

// export async function queryChat(text: string): Promise<string> {
//   const configData = await getConfig()
//   const { apiKey, model, tokenLimit } = configData

//   const response = await fetch(
//     `https://api-inference.huggingface.co/models/${model}`,
//     {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//       body: JSON.stringify({
//         inputs: queryChatBuilder(text),
//         // inputs: text,
//         parameters: {
//           max_new_tokens: tokenLimit,
//         },
//       }),
//     }
//   )
//   const result = await response.json()
//   return queryChatCleaner(result[0].generated_text)
//   // return result[0].generated_text
// }

// function queryChatBuilder(text: string): string {
//   return `<|prompter|>${text}<|endoftext|><|assistant|>`
// }

// function queryChatCleaner(text: string): string {
//   const response = text.split('<|assistant|>')
//   return response[1]
// }

export async function queryChat(text: string): Promise<string> {
  const configData = await getConfig()
  const { apiKey, model, tokenLimit } = configData

  const hf = new HfInference(apiKey)

  const response = await hf.textGeneration({
    model,
    inputs: text,
    parameters: {
      max_new_tokens: tokenLimit,
      return_full_text: false,
    },
  })

  return response.generated_text
}
