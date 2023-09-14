import { type FC } from 'react'

export interface MessageProps {
  createdAt: string
  createdBy: string
  message: string
}

const Message: FC<MessageProps> = ({ createdBy, message }) => {
  const formatResponse: (response: string) => JSX.Element[] = (
    response: string
  ) => {
    const lines = response.split('\n')
    const formattedLines = []
    let isCodeBlock = false
    let codeBlockLanguage = ''
    let codeLines = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        if (!isCodeBlock) {
          isCodeBlock = true
          codeBlockLanguage = line.replace(/```(\S*)/, '$1')
        } else {
          isCodeBlock = false
          formattedLines.push(
            <div key={i} className="code-block">
              <pre className={`language-${codeBlockLanguage}`}>
                <code>{codeLines.join('\n')}</code>
              </pre>
            </div>
          )
          codeLines = []
        }
      } else if (isCodeBlock) {
        codeLines.push(line)
      } else {
        formattedLines.push(<p key={i}>{line}</p>)
      }
    }

    return formattedLines
  }

  return (
    <div className={`p-4 ${createdBy === 'ai' ? 'bg-eerie  rounded-xl' : ''}`}>
      <div>{formatResponse(message)}</div>
    </div>
  )
}

export default Message
