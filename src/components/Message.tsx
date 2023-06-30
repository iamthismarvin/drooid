import React, { type FC } from 'react'

export interface MessageProps {
  createdAt: string
  createdBy: string
  message: string
}

const Message: FC<MessageProps> = ({ createdBy, message }) => {
  const parsedText = message.split('\n')

  return (
    <div className={`p-4 ${createdBy === 'ai' ? 'bg-eerie  rounded-xl' : ''}`}>
      {parsedText.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}

export default Message
