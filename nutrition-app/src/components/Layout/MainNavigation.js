import { useContext  } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
<<<<<<< HEAD
        <div className={classes.logo}>My Recipes</div>
=======
        <div className={classes.logo}>My recipes</div>
>>>>>>> 0fee123f3f8687b6c57d3ed7ac1de85253426f7a
      </Link>
      <nav>
        <ul>
        {!isLoggedIn && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        )}
        {isLoggedIn &&(
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
