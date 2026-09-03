import { ChatLabPage } from './components/ChatLabPage'
import { OntologyDemoPage } from './components/ontology-demo/OntologyDemoPage'
import { SharedConversationPage } from './components/SharedConversationPage'
import { isSharedConversationPath } from './fixtures/chat-lab'

export default function App() {
  if (isSharedConversationPath(window.location.pathname)) {
    return <SharedConversationPage />
  }

  if (window.location.pathname === '/ontology-demo') {
    return <OntologyDemoPage />
  }

  return <ChatLabPage />
}
