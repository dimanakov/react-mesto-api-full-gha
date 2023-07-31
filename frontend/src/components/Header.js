import logo from '../images/logo.svg';
import { useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { UserEmailContext } from '../contexts/UserEmailContext';

export default function Header({ isLoggedIn, setLoggedIn }) {

  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = useContext(UserEmailContext);

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <header className="header page__content">
      <img
        src={logo}
        className="logo" alt="logo" />
      <ul className='header__menu'>
        {location.pathname === '/sign-up' && <li ><Link to='/sign-in' className="header__link" >Войти</Link></li>}
        {location.pathname === '/sign-in' && <li ><Link to='/sign-up' className="header__link" >Регистрация</Link></li>}
        {isLoggedIn &&
          <li>
            <div className='header__currentUser'>
              <span>{userEmail}</span>
              <button className='button button_focus button_header' onClick={signOut}>Выйти</button>
            </div>
          </li>}
      </ul>
    </header>
  )
}