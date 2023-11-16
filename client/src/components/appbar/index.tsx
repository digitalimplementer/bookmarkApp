import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { routes } from 'routes/routes';

import type { AppbarProps } from './types';
import classes from './classes.module.scss';

export const Appbar = ({ disabled }: AppbarProps) => {
   const navs = [
      { id: 1, label: 'Home', route: routes().home },
      { id: 2, label: 'Bookmarks', route: routes().bookmarks },
      { id: 3, label: 'Profile', route: routes().profile },
   ];
   return (
      <header className={clsx(classes.appbarWrapper, disabled && classes.disabled)}>
         <div>Logo</div>
         <div className={classes.linksBox}>
            {navs.map(({ id, label, route }) => (
               <NavLink
                  end
                  key={id}
                  to={route}
                  className={({ isActive }) => (isActive ? classes.activeLink : '')}
               >
                  {label}
               </NavLink>
            ))}
         </div>
      </header>
   );
};
