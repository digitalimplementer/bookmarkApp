import React from 'react';

import { useAppSelector } from 'store/hooks';
import { authState } from 'store/auth/auth.slice';
import { RegisterForm } from 'forms/auth/register.form';
import { LoginForm } from 'forms/auth/login.form';

import classes from './classes.module.scss';

export function AuthPage() {
   const { authMethod } = useAppSelector(authState);
   return (
      <section className={classes.pageWrapper}>
         {authMethod === 'register' ? <RegisterForm /> : authMethod === 'login' ? <LoginForm /> : null}
      </section>
   );
}
