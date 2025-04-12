import './styles/global.css'
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import MainApp from '#/app'

// The root element for the app.
const rootElement = document.getElementById('app')

if (!rootElement) {
  throw new Error(
    "Root element not found. Check if it's in your index.html or if the id is correct."
  )
}

// When you use Strict Mode, React renders each component twice to help you find unexpected side effects.
// @ref: https://react.dev/blog/2022/03/08/react-18-upgrade-guide#react
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <MainApp />
    </BrowserRouter>
  </React.StrictMode>
)
