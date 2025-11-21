import { useState } from 'react'
import nitroLogo from './assets/nitro.svg'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

export default function App() {
  const [apiResult, setApiResult] = useState<string | null>(null)

  const handleApiClick = async () => {
    try {
      const res = await fetch('/api/hello')
      const data = await res.json()
      setApiResult(JSON.stringify(data))
    } catch (_) {
      setApiResult('Error fetching API')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 transition-colors dark:bg-slate-900">
      <div className="mb-8 flex gap-8">
        <a href="https://nitro.build/" target="_blank" rel="noopener">
          <img
            src={nitroLogo}
            className="h-16 w-16 transition-transform hover:scale-110"
            alt="Nitro logo"
          />
        </a>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img
            src={viteLogo}
            className="h-16 w-16 transition-transform hover:scale-110"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img
            src={reactLogo}
            className="h-16 w-16 transition-transform hover:scale-110"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="mb-6 font-bold text-4xl text-slate-900 dark:text-slate-100">
        Nitro + Vite + React
      </h1>
      <div className="card flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
        <button
          type="button"
          onClick={handleApiClick}
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Call Hello API
        </button>
        {apiResult && (
          <p className="text-slate-700 dark:text-slate-200">
            Result:{' '}
            <code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-700">{apiResult}</code>
          </p>
        )}
        <p className="text-slate-500 dark:text-slate-400">
          Edit <code className="rounded bg-slate-100 px-1 dark:bg-slate-700">app/app.tsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-8 text-slate-400 dark:text-slate-500">
        Click on the Nitro, Vite and React logos to learn more
      </p>
    </div>
  )
}
