import React, { useEffect, useState, FormEvent, ChangeEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../../context/user-context';
import { FiX } from 'react-icons/fi'
import api from '../../utils/axios'

import './login.styles.css'

const Login = () => {
  // Dados do formulario
  const [formDefault, setFormDefault] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const { name, email, password, confirmPassword } = formDefault;

// boolean in case toogle "remember me" is activated, this mode is to "persist" the user, storing the token in local storage
  //booleano para caso toogle "remember me" seja ativado, modo serve para "persistir" o usuario, armazenando o token no local storage 
  const [rememberMe, setRememberMe] = useState<boolean>(false);

// Hook that triggers an error message if it occurs
  // Hook que dispara mensagem de erro caso ocorra
  const [errorMessage, setErrorMessage] = useState(false);

  // Context API elements are accessed here
  // Elementos do Context API são acessados aqui
  const { setCurrentUser, currentUser, setToken, getToken } = useContext(UserContext)

  const navigate = useNavigate();   //Hook for navigation       // Hook para navegação
  const token = getToken();         //Receiving the token       // Recebendo o token


  // Function in case there is a desire to register the access of a new user
  // Função para caso haja o desejo de registrar o acesso de um novo usuario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formDefault)

    const res = await api.post("auth/register", {
      name, email, password, confirmPassword
    })
    console.log(res)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDefault({ ...formDefault, [name]: value });
  };

  const toogleRememberMe = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(!rememberMe)
  };

  // Function that sends data to the backend and, if approved, executes the login
  // Função que envia os dados para o backend e caso haja aprovação executa o login
  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password, rememberMe)
    const res = await api.post('/auth/login', { email, password })
    console.log(res)
    const token = res.data.token

    setCurrentUser({ name, email, token })
    navigate('/crud')
    if (rememberMe) setToken(res.data.token)
  }
  
// Check if there is still token stored for persist user
  // Confere se ainda há token armazenado para usuario persista
  useEffect(() => {
    if (token && !currentUser) return setCurrentUser({name, email, token})
  }, [currentUser])

  return (
    <>
    <form onSubmit={handleSubmit}>
    <input 
      id='name'
      name='name'
      type='text'
      value={name}
      onChange={handleChange}
    />
    <input 
      id='email'
      name='email'
      type='text'
      value={email}
      onChange={handleChange}
    />
    <input 
      id='password'
      type='text'
      name='password'
      value={password}
      onChange={handleChange}
    />
    <input 
      id='confirm'
      type='text'
      name='confirmPassword'
      value={confirmPassword}
      onChange={handleChange}
    />
    <button >Click me</button>
    </form>
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmitLogin}>

            <span className="login-form-title"> LOGIN </span>
            <div className="wrap-input">
              <input
                className={email !== '' ? 'has-val input' : 'input'}
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={handleChange}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== '' ? 'has-val input' : 'input'}
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>


            <div className='label-check'>
              <label >Remember Me: </label>
                <label className="switch" >
                  <input
                    className='check'
                    type="checkbox"
                    checked={rememberMe}
                    onChange={toogleRememberMe}
                    ></input>
                  <span className="slider round" style={{margin: '0px'}}></span>
                </label>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">
                Login
              </button>
            </div>

            {errorMessage ? (
              <small className="error-message" >
                {errorMessage} <span onClick={() => setErrorMessage(false)} > <FiX /> </span>
              </small>
            ) : null}

          </form>
        </div>
      </div>
    </>
  )
}

export default Login