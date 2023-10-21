import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './container/Main.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)