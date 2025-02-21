import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(
    'The root element could not be located. Please verify that the id is correct or exists.'
  )
}

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
