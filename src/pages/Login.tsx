import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alert';
import clientAxios from '../config/axios';

const Login = () => {
  const { auth }: any = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth }: any = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clientAxios.post('/login', { email, password });
      await localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/user');
    } catch (error: any) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg }: any = alerta;

  return (
    <>
      <div className=" w-4/6 mx-24">
        <h1 className="text-purple-800 font-black text-4xl">CristoGrand</h1>
        <span className="text-purple-700 text-3xl">
          CristoGrand es una app <span className="text-red-600">cristiana</span>{' '}
          que te acerca a los tuyos.
        </span>
      </div>
      <div className="mt-10 md:mt-5 shodow-lg px-3 py-10 rounded-xl bg-white w-4/6  ">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="Email"
              placeholder="Email De Registro"
              className="border w-5/6 sm:w-full p-1 mt-1 bg-gray-50 rounded-lg "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="border w-5/6 sm:w-full p-1 mt-1 bg-gray-50 rounded-lg "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-purple-400 w-full py-1 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-purple-500 "
          />
        </form>

        <nav className="md:mt-10 2lg:flex  lg:justify-between">
          <Link to={'/registrarse'} className="block text-center my-5">
            ¿No tienes una Cuenta? Regístrate!
          </Link>

          <Link to={'/olvide-password'} className="block text-center my-5">
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
