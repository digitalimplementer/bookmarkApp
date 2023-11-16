import React, { useState } from 'react';
import clsx from 'clsx';

import { Icon } from 'components/icon';
import { ENUM_ICON } from 'enums/icon';

import type { TextFieldProps } from './types';
import classes from './classes.module.scss';

export const PasswordTextField = ({ ...rest }: TextFieldProps) => {
   const [visible, setVisible] = useState(false);
   return (
      <div className={classes.passwordInputWrapper}>
         <input {...rest} type={visible ? 'text' : 'password'} className={clsx(classes.inputClass)} />
         <Icon
            name={visible ? ENUM_ICON.VISIBLE : ENUM_ICON.UNVISIBLE}
            onClick={() => setVisible((prev) => !prev)}
            className={classes.icon}
         />
      </div>
   );
};
