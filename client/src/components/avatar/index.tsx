import React from 'react';
import clsx from 'clsx';

import { pxToRem } from 'utils';
import { Icon } from 'components/icon';
import { ENUM_ICON } from 'enums/icon';

import type { AvatarProps } from './types';
import classes from './classes.module.scss';

export const Avatar = ({ size = 72, className }: AvatarProps) => {
   const styles = {
      width: `${pxToRem(size)}`,
      height: `${pxToRem(size)}`,
   };
   return (
      <div style={styles} className={clsx(classes.avatar, className)}>
         <Icon name={ENUM_ICON.PERSON} size={36} />
      </div>
   );
};
