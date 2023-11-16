import React, { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/hooks';
import { Icon } from 'components/icon';
import { ENUM_ICON } from 'enums/icon';
import { Button } from 'components/button';
import { handleTextfieldChange } from 'utils';
import { routes } from 'routes/routes';
import type { ResponseSignupUserData } from 'store/auth/types';
import { TextField, PasswordTextField } from 'components/textfield';
import { changeAuthMethod, loginUser, registerUser } from 'store/auth/auth.slice';
import { GoogleIcon } from 'components/icon/icons';

import classes from './classes.module.scss';

export function RegisterForm() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const [registerData, setRegisterData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
   });
   const [loading, setLoading] = useState(false);

   const switchToLogin = () => {
      dispatch(changeAuthMethod('login'));
   };

   const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      setLoading(true);
      dispatch(registerUser(registerData)).then((response) => {
         const payload = response?.payload as ResponseSignupUserData;
         if (payload) {
            dispatch(loginUser({ email: registerData.email, password: registerData.password })).then(() => {
               setRegisterData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
               });
               setLoading(false);
               navigate(routes().home);
            });
         }
      });
   };

   return (
      <form className={classes.formClass} onSubmit={handleSubmit}>
         <div className={classes.topWrapper}>
            <div className={classes.formLabel}>
               <h3>Create your account</h3>
               <Icon name={ENUM_ICON.WAVING_HAND} />
            </div>
            <Button type='button' variant='outlined' startIcon={<GoogleIcon />}>
               Sign up with Google
            </Button>
         </div>
         <div className={classes.orBox}>
            <div className={classes.line} />
            <p>Or</p>
            <div className={classes.line} />
         </div>
         <div className={classes.inputsWrapper}>
            <TextField
               placeholder='First name'
               name='firstName'
               value={registerData.firstName}
               onChange={(e) => handleTextfieldChange(e, setRegisterData)}
            />
            <TextField
               placeholder='Last name'
               name='lastName'
               value={registerData.lastName}
               onChange={(e) => handleTextfieldChange(e, setRegisterData)}
            />
            <TextField
               required
               type='email'
               placeholder='Email'
               name='email'
               value={registerData.email}
               onChange={(e) => handleTextfieldChange(e, setRegisterData)}
            />
            <PasswordTextField
               required
               placeholder='Password'
               name='password'
               value={registerData.password}
               onChange={(e) => handleTextfieldChange(e, setRegisterData)}
            />
         </div>
         <div className={classes.buttonsWrapper}>
            <Button type='submit' disabled={loading} loading={loading}>
               Register
            </Button>
            <Button type='button' variant='text' onClick={switchToLogin}>
               Have an Account
            </Button>
         </div>
      </form>
   );
}
