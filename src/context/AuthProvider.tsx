import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios';

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const userAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios('/perfil', config);

        setAuth(data.user);
      } catch (error: any) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };
    userAuthentication();
  }, []);

  // Función para cerrar sesión
  const closeSesion = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, closeSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
