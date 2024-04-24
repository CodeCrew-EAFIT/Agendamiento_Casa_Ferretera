import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserSessionProvider } from './utils/UserSessionContext'
import ChooseUser from './pages/ChooseUser'
import Home from './pages/Home'
import UserPanel from './pages/Admin/UserPanel'
import SchedulePromotion from './pages/SchedulePromotion'
import Binnacle from './pages/Binnacle'
import BlockPromotion from './pages/BlockPromotion'
import PromoterRating from './pages/PromoterRating'
import ProtectedRoute from './components/ProtectedRoute'
import Evidence from './pages/Evidence'
import {
  USER_TYPES,
  ADMIN_USERS,
  ADMIN,
  PROMOTER,
  SUPERVISOR
} from './utils/constants'
import { CalendarContextProvider } from './utils/CalendarContext'

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
                element={
                  <CalendarContextProvider>
                    <Home />
                  </CalendarContextProvider>
                }
                allowedUsers={USER_TYPES}
                redirectTo="/"
              />
            }
          />
          <Route
            path="/horario/agendar"
            element={
              <ProtectedRoute
                element={
                  <CalendarContextProvider>
                    <SchedulePromotion />
                  </CalendarContextProvider>
                }
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
            path="/calificar"
            element={
              <ProtectedRoute
                element={<Binnacle />}
                allowedUsers={[SUPERVISOR]}
                redirectTo="/horario"
              />
            }
          />
          <Route
            path="/calificar/:id"
            element={
              <ProtectedRoute
                element={<PromoterRating />}
                allowedUsers={[SUPERVISOR]}
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
          <Route
            path="/bloquear"
            element={
              <ProtectedRoute
                element={
                  <CalendarContextProvider>
                    <BlockPromotion />
                  </CalendarContextProvider>
                }
                allowedUsers={[SUPERVISOR, ADMIN]}
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
