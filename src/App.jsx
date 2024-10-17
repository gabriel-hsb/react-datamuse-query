import { useState, useEffect  } from 'react'

function App() {

  const BASE_URL = 'https://api.datamuse.com/'
  const test = 'words?sl=car'

  const fetchData = async(url) => {
    if (typeof url !== 'string') return;

    const res = await fetch(BASE_URL + url)
    const json = await res.json()
    console.log(json)
  }

  // useEffect(() => {
  //   fetchData(test)
  // }, [])

  return (
    <>
      <div>
      </div>
      <h1 className='font-sans text-4xl'>Vite + React</h1>
      <div >
        <button className='bg-zinc-200 p-3 rounded-xl border hover:bg-slate-500 transition-all font-mono' onClick={() => fetchData(test)}>
          Fetch <br /> {test}
        </button>
      </div>
    </>
  )
}

export default App
