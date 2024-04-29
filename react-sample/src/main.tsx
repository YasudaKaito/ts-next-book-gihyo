import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import Hello from './components/Hello'
// import Name from './components/Name'
// import Message from './components/Message'
// import Parent from './components/ContainerSample'
// import Page from './components/ContextSample'
// import Counter from './components/UseStateSample'
// import CounterReducer from './components/UseReducerSample'
// import { Parent } from './components/MemoSample'
// import { Parent } from './components/MemoSampleCallback'
// import { Parent } from './components/UseCallbackSample'
import { UseMemoSample } from './components/UseMemoSample'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UseMemoSample />
  </React.StrictMode>
)
