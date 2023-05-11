import { type FC } from 'react'

const Textbox: FC = () => {
  return (
    <>
      <textarea className="shadow p-2 rounded-xl bg-eerie w-full max-w-full resize-none"></textarea>
    </>
  )
}

const Prompt: FC = () => {
  return (
    <div>
      <h2>Prompt</h2>
      <Textbox />
    </div>
  )
}

export default Prompt
