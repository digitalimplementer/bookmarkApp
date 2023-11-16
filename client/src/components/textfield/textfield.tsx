import React from 'react';

import type { TextFieldProps } from './types';
import classes from './classes.module.scss';

export const TextField = ({
   type = 'text',
   placeholder = '',
   name,
   label,
   onChange,
   ...rest
}: TextFieldProps) => {
   return (
      <>
         <label htmlFor={name} id={name}>
            {label}
         </label>
         <input
            {...rest}
            name={name}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className={classes.inputClass}
         />
      </>
   );
};
