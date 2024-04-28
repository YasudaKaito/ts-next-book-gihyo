import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import Hello from './components/Hello'
// import Name from './components/Name'
// import Message from './components/Message'
// import Parent from './components/ContainerSample'
import Page from './components/ContextSample'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
)
