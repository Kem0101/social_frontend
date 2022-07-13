import { useState, useEffect } from 'react';
import clientAxios from '../config/axios';
import Alerta from '../components/Alert';
import { useParams, Link } from 'react-router-dom';

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clientAxios(`/forgot-password/${token}`);
        setAlerta({ msg: 'Coloca tu nueva contraseña' });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSumit = async (e: any) => {
    e.preventDefault();

    if (password.length < 7) {
      setAlerta({
        msg: 'La constraseña debe ser minimo 7 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `/forgot-password/${token}`;
      const { data } = await clientAxios.post(url, { password });

      setAlerta({
        msg: data.msg,
      });
      setPasswordModificado(true);
    } catch (error: any) {
      setAlerta({
        msg: error.response.data.msg,
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

        {tokenValido && (
          <>
            <form onSubmit={handleSumit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder=" Nueva Contraseña"
                  className="border w-5/6 sm:w-full p-1 mt-1 bg-gray-50 rounded-lg "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar Nueva Contraseña"
                className="bg-purple-400 w-full py-1 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-purple-500 "
              />
            </form>
          </>
        )}

        {passwordModificado && (
          <Link to={'/'} className="block text-center my-5">
            Inicia Sesión!
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
