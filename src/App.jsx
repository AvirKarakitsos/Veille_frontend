import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='main-container'>
      <div className='container'>
        <Outlet/>
      </div>
      <div className="cercle1"></div>
      <div className="cercle2"></div>
    </div>
  )
}

export default App
