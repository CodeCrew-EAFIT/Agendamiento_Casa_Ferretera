import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { UserSessionProvider } from './utils/UserSessionContext'
import ChooseUser from './pages/ChooseUser'
import Home from './pages/Home'
import Users from './pages/Admin/Users'
import AddPromotion from './pages/Boss/AddPromotion'

function App () {
  return (
    <UserSessionProvider>
        <Router>
            <Routes>
              <Route path="/" element={<ChooseUser />} />
              <Route path='/horario' element={<Home />} />
              <Route path='/usuarios' element={<Users />} />
              <Route path='/agendar' element={<AddPromotion />} />
            </Routes>
        </Router>
    </UserSessionProvider>
  )
}

export default App
