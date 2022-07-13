import { useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../config/axios';
import Alerta from '../components/Alert';

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if ([fullname, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no son iguales', error: true });
      return;
    }

    if (password.length < 7) {
      console.log('Contraseña minima de 7 caracteres');
      setAlerta({ msg: 'Contraseña minima de 7 caracteres', error: true });
      return;
    }

    setAlerta({});

    // Crear el usuario en la api
    try {
      await clientAxios.post(`/register`, {
        fullname,
        username,
        email,
        password,
      });
      setAlerta({
        msg: 'Usuario creado correctamente, revisa tu email!',
        error: false,
      });
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
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Nombre Completo"
              className="border w-5/6 sm:w-full p-1 mt-1 bg-gray-50 rounded-lg "
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre de Usuario
            </label>
            <input
              type="text"
              placeholder="Nombre de Usuario"
              className="border w-5/6 sm:w-full p-1 mt-1 bg-gray-50 rounded-lg "
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
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
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repite tu Password
            </label>
            <input
              type="password"
              placeholder="Repite Contraseña"
              className="border w-5/6 sm:w-full p-1 mt-1 bg-gray-50 rounded-lg "
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-purple-400 w-full py-1 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-purple-500 "
          />
        </form>

        <nav className="md:mt-10 2lg:flex  lg:justify-between">
          <Link to={'/'} className="block text-center my-5">
            ¿Ya tienes una cuenta? Inicia Sesión!
          </Link>

          <Link to={'/olvide-password'} className="block text-center my-5">
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
