import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { auth, closeSesion } = useAuth();

  return (
    <header className="py-10 bg-purple-700">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200">
          La Red de los <span>Cristianos</span>
        </h1>

        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link to="/user" className="text-white text-sm uppercase front-bold">
            Amigos
          </Link>
          <Link to="/user" className='text-white text-sm uppercase front-bold"'>
            Chats
          </Link>
          <Link
            to={'/perfil'}
            className='text-white text-sm uppercase front-bold"'
          >
            Perfil
          </Link>
          <button
            type="button"
            className='text-white text-sm uppercase front-bold"'
            onClick={closeSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
