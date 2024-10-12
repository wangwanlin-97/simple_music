import {createContext} from "react"
import {useContext} from "react"

export const MessageContext = createContext()

export const MessageProvider = ({children}) => {
  const [messages, setMessages] = useState("")

  const showMessage = (msg, type, duration = 3000) => {
    const id = Date.now()
    setMessages([...messages, {id, content: msg, type: type}])

    setTimeout(() => {
      removeMessage(id)
    }, duration)
  }
  function removeMessage(id) {
    setMessages(messages.filter(msg => msg.id !== id))
  }

  return (
    <MessageContext.Provider value={{showMessage}}>
      {children}
      <MessageList messages={messages} />
    </MessageContext.Provider>
  )
}

function MessageList({messages}) {
  return (
    <div>
      {messages.map((message, index) => (
        <div className={"message-" + message.type}>{message.content}</div>
      ))}
    </div>
  )
}

export function useMessage() {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider")
  }
  return context //返回MessageContext提供的showMessage方法
}
