import React, { useState, useEffect } from 'react';
import { ENUM_ICON, IconPath } from 'enums/icon';
import { pxToRem } from 'utils';

interface IconProps {
   name: ENUM_ICON;
   fill?: string;
   size?: number;
   className?: string;
   onClick?: () => void;
}
export const Icon = ({ name, fill = 'gray', size = 24, className, onClick }: IconProps) => {
   const [iconPaths, setIconPaths] = useState<string[]>([]);
   const [viewBox, setViewBox] = useState<string>('0 0 48 48');
   const [iconFill, setIconFill] = useState<string>('');
   const [iconStroke, setIconStroke] = useState<string>('');
   const [strokeWidth, setStrokeWidth] = useState(0);
   const [iconRemWidth, setIconRemWidth] = useState<string>('1rem');
   const [iconRemHeight, setIconRemHeight] = useState<string>('1rem');

   const [fillRule, setFillRule] = useState<'evenodd' | 'nonzero' | 'inherit' | undefined>('inherit');
   const [clipRule, setClipRule] = useState<'evenodd' | 'nonzero' | 'inherit' | undefined>('inherit');

   useEffect(() => {
      if (name && IconPath.get(name)) {
         const icon = IconPath.get(name);
         if (icon) {
            setIconPaths(icon.paths);
            setViewBox(icon.viewBox || '0 0 48 48');
            setIconFill(icon.fill || fill);
            setIconRemWidth(pxToRem(icon.width || size));
            setIconRemHeight(pxToRem(icon.height || size));
            setIconStroke(icon.stroke || '');
            setStrokeWidth(icon.strokeWidth || 0);
            setFillRule(icon.fillRule || 'inherit');
            setClipRule(icon.clipRule || 'inherit');
         }
      }
   }, [name, fill]);
   return (
      <svg
         fill='none'
         className={className}
         xmlns='http://www.w3.org/2000/svg'
         viewBox={viewBox}
         width={iconRemWidth}
         height={iconRemHeight}
         onClick={onClick}
      >
         {iconPaths.map((path) => (
            <path
               d={path}
               clipRule={clipRule}
               fillRule={fillRule}
               key={path}
               fill={iconFill}
               stroke={iconStroke}
               strokeWidth={strokeWidth}
            />
         ))}
      </svg>
   );
};
