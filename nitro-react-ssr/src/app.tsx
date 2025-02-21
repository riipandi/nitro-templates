import { Suspense, useEffect, useState } from 'react'
import reactLogo from '/images/react.svg'
import viteLogo from '/images/vite.svg'

export default function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then(({ message }) => setMessage(message))
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex space-x-4">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            className="h-24 w-24 transform transition-transform hover:scale-110"
            alt="Vite logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="h-24 w-24 transform animate-spin-slow transition-transform hover:scale-110"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="mt-6 font-bold text-3xl">Vite + React + Nitro 🤝</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <h2 className="mt-2 text-xl">API Response: {message}</h2>
      </Suspense>

      <div className="mt-6 rounded-2xl bg-gray-800 p-6 shadow-lg">
        <button
          type="button"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-700"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-2 text-gray-300">
          Edit <code className="font-mono text-gray-400">src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-4 text-gray-400">Click on the Vite and React logos to learn more</p>
    </div>
  )
}
