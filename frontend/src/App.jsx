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
import SchedulePromotion from './pages/SchedulePromotion'
import ProtectedRoute from './components/ProtectedRoute'
import { USER_TYPES, ADMIN_USERS, ADMIN } from './utils/constants'

function App () {
  return (
    <UserSessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ChooseUser />} />
          <Route
            path="/horario"
            element={
              <ProtectedRoute
                element={<Home />}
                allowedUsers={USER_TYPES}
                redirectTo="/"
              />
            }
          />
          <Route
            path="/horario/agendar/:location"
            element={
              <ProtectedRoute
                element={<SchedulePromotion />}
                allowedUsers={ADMIN_USERS}
                redirectTo="/horario"
              />
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute
                element={<Users />}
                allowedUsers={[ADMIN]}
                redirectTo="/horario"
              />
            }
          />
        </Routes>
      </Router>
    </UserSessionProvider>
  )
}

export default App
