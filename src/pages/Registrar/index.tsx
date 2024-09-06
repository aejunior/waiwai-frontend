import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import AxiosClient from '@/services/registrar';

const Registrar: React.FC = () => {
 
  const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidPassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // console.log("Formulário submetido");
  
      if (formData.password !== formData.confirmPassword) {
          setErrorMessage("As senhas não coincidem.");
          return;
      }
  
      if (!isValidPassword(formData.password)) {
          setErrorMessage("A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um símbolo.");
          return;
      }
  
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      console.log("Formulário submetido");
      try {
          const axiosInstance = AxiosClient();
          const { confirmPassword, ...dataSubmit } = formData;
          console.log("Dados enviados:", dataSubmit);
  
          const response = await axiosInstance.post('/auth/signup', dataSubmit);
      
          console.log("Resposta da API:", response);
  
          setSuccessMessage('Conta criada com sucesso!');
          setErrorMessage(null);
      } catch (error) {
          if (error.response) {
              
              console.log("Erro da API:", error.response); 
              setErrorMessage(error.response.data.message || 'Erro ao criar a conta. Por favor, tente novamente.');
          } else {
              setErrorMessage('Erro ao criar a conta. Por favor, tente novamente.');
          }
          setSuccessMessage('');
      } finally {
          setLoading(false);
      }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
  return (
    <>
     <section className="relative mt-28 mb-10 z-10 overflow-hidden">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Crie sua conta
                </h3>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Cadastre-se com seu e-mail
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>

                {errorMessage && (
                  <div className="mb-4 text-red-500 text-center">
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="mb-4 text-green-500 text-center">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label htmlFor="first_name" className="mb-3 block text-sm text-dark dark:text-white">
                      Primeiro Nome
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Seu primeiro nome"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="last_name" className="mb-3 block text-sm text-dark dark:text-white">
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Seu sobrenome"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="email" className="mb-3 block text-sm text-dark dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Exemplo@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="password" className="mb-3 block text-sm text-dark dark:text-white">
                      Senha
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="confirmPassword" className="mb-3 block text-sm text-dark dark:text-white">
                      Confirme sua Senha
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirme sua senha"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                      Registrar
                    </button>
                  </div>
                </form>

                <p className="text-center text-base font-medium text-body-color">
                  Já tem uma conta?{" "}
                  <Link to="/Entrar" className="text-primary hover:underline">
                    Entrar
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V1104H820L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.95"
                y1="221.023"
                x2="780.913"
                y2="539.958"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="1337.5"
                y1="684"
                x2="873.5"
                y2="1097.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Registrar;
