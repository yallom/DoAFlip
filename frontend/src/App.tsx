import { Outlet } from 'react-router-dom'
import Aurora from '@/components/Aurora'

function App() {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  )
}

export default App