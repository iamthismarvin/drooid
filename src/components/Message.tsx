import React, { type FC } from 'react'

const Message: FC<{ text: string }> = ({ text }) => {
  const parsedText = text.split('\n')

  return (
    <div className="p-4">
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
