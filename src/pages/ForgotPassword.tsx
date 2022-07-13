import { useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../config/axios';
import Alerta from '../components/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSudmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({ msg: 'El email es obligatorio', error: true });
      return;
    }

    try {
      const { data } = await clientAxios.post('/forgot-password', { email });
      setAlerta({ msg: data.msg });
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
        <form onSubmit={handleSudmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="Email"
              placeholder="Email"
              className="border w-5/6 sm:w-full p-1 mt-1 bg-gray-50 rounded-lg "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-purple-400 w-full py-1 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-purple-500 "
          />
        </form>

        <nav className="md:mt-10 2lg:flex  lg:justify-between">
          <Link to={'/'} className="block text-center my-5">
            ¿Ya tienes una cuenta? Inicia Sesión!
          </Link>
          <Link to={'/registrarse'} className="block text-center my-5">
            ¿No tienes una Cuenta? Regístrate!
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ForgotPassword;
