import React from 'react';
import clsx from 'clsx';

import type { TextareaProps } from './types';
import classes from './classes.module.scss';

export const Textarea = ({ rows = 10, resize = false, label, name, ...rest }: TextareaProps) => {
   return (
      <>
         <label htmlFor={name} id={name}>
            {label}
         </label>
         <textarea
            name={name}
            className={clsx(classes.inputClass, !resize && classes.textAreaNoResize)}
            rows={rows}
            {...rest}
         />
      </>
   );
};
