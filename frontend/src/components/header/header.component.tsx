import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user-context';

import './header.styles.css'

/* Componente Header para navegação entre as páginas */
/* Header component for navigating between pages */

const Header = ({children}: {children: React.ReactNode}) => {
  const navigate = useNavigate();      // Hook that allows navigation     // Hook que permite a navegação
  
  // User data received from Context to be used for sign out
  // Dados do usuario recebidos do Context para ser usado no sign// User data received from Context to be used for sign out out
  const { setCurrentUser, setToken } = useContext(UserContext) 

  return ( <>
    <div className='navigation'>
      <div className='routes-links'>
        <button className="primary-button" onClick={() => navigate('/random-users')}>Random User</button>
        <button className="primary-button" onClick={() => navigate('/random-dog')}>Random Dog</button>
        <button className="secundary-button" onClick={() => navigate('/http-cat')}>Cat</button>
        <button className="tertiary-button" onClick={() => navigate('/crud')}>Crud</button>
      </div>
      <div className='nav-links'>
        <button className="four-btn" onClick={() => navigate('/')}>Login</button>
        <button className="primary-button" onClick={() => {setCurrentUser(null); setToken('')}}>Logout</button>
      </div>
    </div>
   {children}
  </>
  )
}

export default Header