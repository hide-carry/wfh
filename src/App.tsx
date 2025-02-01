import { useState } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

function App() {
  const [count, setCount] = useState(0)
  
  const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
  supabase
  .from('excuse_registrations')
  .select().then((r) => console.log("res", r))

  return (
    <>
      <h1 className="text-3xl font-bold underline">
    Hello world!24e
  </h1>
  <div className="flex">
    aaaaa
    </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
