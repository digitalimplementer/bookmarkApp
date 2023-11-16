import React, { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/hooks';
import { routes } from 'routes/routes';
import { handleTextfieldChange } from 'utils';
import { changeAuthMethod, loginUser } from 'store/auth/auth.slice';
import { TextField, PasswordTextField } from 'components/textfield';
import { Button } from 'components/button';

import classes from './classes.module.scss';
import { Icon } from 'components/icon';
import { ENUM_ICON } from 'enums/icon';

export function LoginForm() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const [login, setLogin] = useState({
      email: '',
      password: '',
   });
   const [loading, setLoading] = useState(false);

   const switchToRegister = () => {
      dispatch(changeAuthMethod('register'));
   };

   const handleLogin: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      setLoading(true);
      dispatch(loginUser({ email: login.email, password: login.password })).then((response) => {
         if (response.payload?.email) {
            setLogin({
               email: '',
               password: '',
            });
            navigate(routes().home);
            setLoading(false);
         }
      });
   };
   return (
      <form className={classes.formClass} onSubmit={handleLogin}>
         <div className={classes.topWrapper}>
            <div className={classes.formLabel}>
               <h3>Log in</h3>
               <Icon name={ENUM_ICON.WAVING_HAND} />
            </div>
         </div>
         <div className={classes.inputsWrapper}>
            <TextField
               type='email'
               name='email'
               placeholder='Email'
               value={login.email}
               required
               onChange={(e) => handleTextfieldChange(e, setLogin)}
            />
            <PasswordTextField
               placeholder='Password'
               name='password'
               value={login.password}
               required
               onChange={(e) => handleTextfieldChange(e, setLogin)}
            />
         </div>
         <div className={classes.buttonsWrapper}>
            <Button type='submit' disabled={loading}>
               Login
            </Button>
            <Button type='button' variant='text' onClick={switchToRegister}>
               No, I dont
            </Button>
         </div>
      </form>
   );
}
