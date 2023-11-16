import React, { useEffect } from 'react';
import clsx from 'clsx';

import { userState, fetchUser } from 'store/user/user.slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import type { PageWrapperProps } from './types';
import classes from './classes.module.scss';

export function PageWrapper({ children, className }: PageWrapperProps) {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector(userState);

   useEffect(() => {
      if (!user) {
         dispatch(fetchUser());
      }
   }, [dispatch, user]);

   return <section className={clsx(classes.pageWrapper, className)}>{children}</section>;
}
