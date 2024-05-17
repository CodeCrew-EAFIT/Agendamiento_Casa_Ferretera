import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserSessionProvider } from "./utils/UserSessionContext";
import ChooseUser from "./pages/ChooseUser";
import Home from "./pages/Home";
import UserPanel from "./pages/Admin/UserPanel";
import SchedulePromotion from "./pages/SchedulePromotion";
import Binnacle from "./pages/Binnacle";
import BlockPromotion from "./pages/BlockPromotion";
import PromoterRating from "./pages/PromoterRating";
import ProtectedRoute from "./components/ProtectedRoute";
import Evidence from "./pages/Evidence";
import {
  USER_TYPES,
  ADMIN_USERS,
  ADMIN,
  PROMOTER,
  SUPERVISOR,
  CHIEF,
} from "./utils/constants";
import { NotificationContextProvider } from "./utils/NotificationContext";
import { LocationContextProvider } from "./utils/LocationContext";
import Reports from "./pages/Reports";
import PromoterPanel from "./pages/PromoterPanel";
import AddPromoter from "./pages/AddPromoter";

function App() {
  return (
    <UserSessionProvider>
      <NotificationContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ChooseUser />} />
            <Route
              path="/horario"
              element={
                <ProtectedRoute
                  element={
                    <LocationContextProvider>
                      <Home />
                    </LocationContextProvider>
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
                    <LocationContextProvider>
                      <SchedulePromotion />
                    </LocationContextProvider>
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
                    <LocationContextProvider>
                      <BlockPromotion />
                    </LocationContextProvider>
                  }
                  allowedUsers={[SUPERVISOR, ADMIN]}
                  redirectTo="/horario"
                />
              }
            />
            <Route
              path="/reportes"
              element={
                <ProtectedRoute
                  element={<Reports />}
                  allowedUsers={ADMIN_USERS}
                  redirectTo="/horario"
                />
              }
            />
            <Route
              path="/promotores"
              element={
                <ProtectedRoute
                  element={<PromoterPanel />}
                  allowedUsers={[CHIEF]}
                  redirectTo="/horario"
                />
              }
            />
            <Route
              path="/promotores/crear"
              element={
                <ProtectedRoute
                  element={<AddPromoter />}
                  allowedUsers={[CHIEF]}
                  redirectTo="/horario"
                />
              }
            />
          </Routes>
        </Router>
      </NotificationContextProvider>
    </UserSessionProvider>
  );
}

export default App;
