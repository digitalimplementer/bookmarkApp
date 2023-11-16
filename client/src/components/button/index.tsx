import React from 'react';
import clsx from 'clsx';

import { Spinner } from 'components/spinner';
import type { ButtonProps } from './types';

import classes from './classes.module.scss';

export const Button = ({
   variant = 'contained',
   children,
   type = 'button',
   startIcon,
   loading = false,
   textTransform,
   fullWidth,
   ...rest
}: ButtonProps) => {
   const variantClass =
      variant === 'text' ? classes.text : variant === 'contained' ? classes.contained : classes.outlined;

   const transformText = textTransform === 'capitalize' && classes.capitalizeText;

   return (
      <button
         {...rest}
         type={type}
         className={clsx(classes.buttonClass, variantClass, transformText, fullWidth && classes.fullWidth)}
      >
         {!loading ? (
            <>
               {startIcon}
               {children}
            </>
         ) : (
            <Spinner />
         )}
      </button>
   );
};
