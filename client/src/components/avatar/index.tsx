import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { pxToRem } from 'utils';
import { Icon } from 'components/icon';
import { ENUM_ICON } from 'enums/icon';

import type { AvatarProps } from './types';
import classes from './classes.module.scss';

export const Avatar = ({ size = 72, src, className }: AvatarProps) => {
   const [avatarSrc, setAvatarSrc] = useState('');
   useEffect(() => {
      if (src) {
         setAvatarSrc(src);
      }
   }, [src]);
   const styles = {
      width: `${pxToRem(size)}`,
      height: `${pxToRem(size)}`,
      backgroundImage: `url(${avatarSrc})`,
   };
   return (
      <div style={styles} className={clsx(classes.avatar, className)}>
         {!avatarSrc ? <Icon name={ENUM_ICON.PERSON} size={36} /> : null}
      </div>
   );
};
