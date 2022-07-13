import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';
import UserLayout from './layout/UserLayout';

import ConfirmCount from './pages/ConfirmCount';
import ConfirmPassword from './pages/ConfirmCount';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import NewPassword from './pages/NewPassword';

import User from './pages/User';
import UserProfile from './pages/UserProfile';

import { AuthProvider } from './context/AuthProvider';
import { PublicationProvider } from './context/PublicationsProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PublicationProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrarse" element={<Register />} />
              <Route path="olvide-password" element={<ForgotPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmCount />} />
            </Route>

            <Route path="/user" element={<UserLayout />}>
              <Route index element={<User />} />
              <Route path="perfil" element={<UserProfile />} />
            </Route>
          </Routes>
        </PublicationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
