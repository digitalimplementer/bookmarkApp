import React from 'react';

import type { SpinnerProps } from './types';
import classes from './classes.module.scss';

export const Spinner = ({ size = 24, color = '#fff' }: SpinnerProps) => {
   const spinnerStyle = {
      width: `${size}px`,
      height: `${size}px`,
      borderColor: color,
   };

   return <div style={spinnerStyle} className={classes.loader} />;
};
