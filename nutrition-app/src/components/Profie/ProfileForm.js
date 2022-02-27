import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useNavigate();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext)

  const submitHandler = event => {
    event.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;

    //Add validation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDROCVCr2oLbQE1w2kE5GFwKHImioNwGmY', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //Assumption: always succeds
      alert("Password has been saved!");
      history.replace('/');
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;