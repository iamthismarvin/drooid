import {
  useState,
  type FC,
  type KeyboardEvent,
  type ChangeEvent,
  useRef,
  useEffect,
} from 'react'
import Message from '../components/Message'

const Prompt: FC = () => {
  const [promptText, setPromptText] = useState('')
  const [promptMessages, setPromptMessages] = useState<string[]>([])
  const promptMessagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (promptMessagesRef.current != null) {
      const { scrollHeight, clientHeight } = promptMessagesRef.current
      const maxScrollTop = scrollHeight - clientHeight
      promptMessagesRef.current.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth',
      })
    }
  }, [promptMessages])

  function isEmptyOrWhitespace(str: string): boolean {
    return str.trim().length === 0 || str.trim() === '\n' || str.trim() === ''
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setPromptText(event.target.value)
  }

  function handleSubmit(): void {
    if (isEmptyOrWhitespace(promptText)) return
    setPromptMessages((currentPromptMessages) => [
      ...currentPromptMessages,
      promptText,
    ])
    setPromptText('')
  }

  function handleKeyPress(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.shiftKey) return
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto relative">
      <div className="flex-1 overflow-auto p-4" ref={promptMessagesRef}>
        {promptMessages.map((text, index) => (
          <Message key={index} text={text} />
        ))}
      </div>
      <div className="flex items-center p-4 relative">
        <button
          className="absolute right-8 text-aureolin"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
        <textarea
          placeholder='e.g. "Please create a short summary of the novel Dune by Frank Herbert."'
          className="pr-12"
          value={promptText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default Prompt
