import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import ChooseUser from './pages/ChooseUser'
import Home from './pages/Home'
import Users from './pages/Admin/Users'
import AddPromotion from './pages/Boss/AddPromotion'

function App () {
  return (
    <Router>
      <div>
        <h1>
          Agendamiento Casa Ferretera
        </h1>
        <Routes>
          <Route path="/" element={<ChooseUser />} />
          <Route path='/horario' element={<Home />} />
          <Route path='/usuarios' element={<Users />} />
          <Route path='/agendar' element={<AddPromotion />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
