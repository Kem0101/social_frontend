import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Este hook useParams me permite leer el token o id
import clientAxios from '../config/axios';
import Alerta from '../components/Alert';

const ConfirmCount = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmCuenta = async () => {
      try {
        const url = `/confirm/${id}`;
        const { data } = await clientAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error: any) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmCuenta();
  }, []); // Este array vacío lo es para que esta funcion solo se ejecute una vez luego que el component cargo

  return (
    <>
      <div className=" w-4/6 mx-24">
        <h1 className="text-purple-800 font-black text-4xl">CristoGrand</h1>
        <span className="text-red-400 text-3xl">
          Confirma tu cuenta y comienza a usar tu red social pura!
        </span>
      </div>

      <div className="mt-10 md:mt-5 shodow-lg px-3 py-10 rounded-xl bg-white w-4/6  ">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to={'/'} className="block text-center my-5">
            Iniciar Sesión!
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmCount;
