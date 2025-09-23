import { useState } from 'react'
import './App.css'
import './Quiz.jsx'
import Quiz from './Quiz.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Quiz></Quiz>
    </>
  )
}

export default App
