export const pxToRem = (value: number, baseFontSize = 16) => {
   const remValue = value / baseFontSize;
   return `${remValue}rem`;
};

export const handleTextfieldChange = <T>(
   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   setState: React.Dispatch<React.SetStateAction<T>>,
) => {
   setState(
      (prev) =>
         ({
            ...prev,
            [e.target.name]: e.target.value,
         }) as T,
   );
};
