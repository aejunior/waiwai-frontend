import React from 'react';
import { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {
  const { signed, Login } = useAuth();

  console.log(signed);

  async function handleLogin() {
    await Login({
      email: 'admin@example.com',
      password: 'Admin@123',
    });
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
