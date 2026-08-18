import { ChatLabPage } from './components/ChatLabPage'
import { SharedConversationPage } from './components/SharedConversationPage'
import { isSharedConversationPath } from './fixtures/chat-lab'

export default function App() {
  if (isSharedConversationPath(window.location.pathname)) {
    return <SharedConversationPage />
  }

  return <ChatLabPage />
}
