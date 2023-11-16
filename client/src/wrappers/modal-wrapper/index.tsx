import React from 'react';
import clsx from 'clsx';

import { Icon } from 'components/icon';
import { ENUM_ICON } from 'enums/icon';

import type { ModalWrapperProps } from './types';
import classes from './classes.module.scss';

export const ModalWrapper = ({ open, onClose, className, children }: ModalWrapperProps) => {
   return (
      <dialog open={open} className={classes.dialog}>
         <div className={clsx(classes.modalWrapper, className)}>
            <div className={classes.modalHeading}>
               <h5 className={classes.title}>Create bookmark</h5>
               <Icon name={ENUM_ICON.CLOSE} onClick={onClose} />
            </div>
            <div className={classes.modalContentBox}>{children}</div>
         </div>
      </dialog>
   );
};
