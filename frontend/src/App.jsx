import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { UserSessionProvider } from './utils/UserSessionContext'
import ChooseUser from './pages/ChooseUser'
import Home from './pages/Home'
import UserPanel from './pages/Admin/UserPanel'
import SchedulePromotion from './pages/SchedulePromotion'
import Binnacle from './pages/Binnacle'
import ProtectedRoute from './components/ProtectedRoute'
import { USER_TYPES, ADMIN_USERS, ADMIN, PROMOTER } from './utils/constants'
import Evidence from './pages/Evidence'

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
                element={<UserPanel />}
                allowedUsers={[ADMIN]}
                redirectTo="/horario"
              />
            }
          />
          <Route
            path="/bitacora"
            element={
              <ProtectedRoute
                element={<Binnacle />}
                allowedUsers={[PROMOTER]}
                redirectTo="/horario"
              />
            }
          />
          <Route
            path="/bitacora/:id"
            element={
              <ProtectedRoute
                element={<Evidence />}
                allowedUsers={[PROMOTER]}
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
