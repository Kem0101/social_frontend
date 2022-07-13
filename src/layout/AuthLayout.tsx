import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <h1>Diseño principal</h1>

      <main className="mx-auto md:grid md:grid-cols-2 mt-14 gap-10 p-5 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
