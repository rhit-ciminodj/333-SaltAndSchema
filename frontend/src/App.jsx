import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            SaltAndSchema
          </h1>
          <p className="text-lg text-gray-600">
            CSSE 333 Project
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-3">Welcome!</h2>
          <p className="text-blue-50">
            This is your React + Tailwind CSS frontend starter. 
            The backend data manipulation will be handled separately.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="bg-gray-50 rounded-lg p-6 w-full">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Counter Demo</h3>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCount(count - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                -
              </button>
              <span className="text-3xl font-bold text-gray-800 w-20 text-center">
                {count}
              </span>
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500 text-center">
            <p>Frontend: React + Tailwind CSS</p>
            <p>Backend: Ready for your custom data manipulation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
