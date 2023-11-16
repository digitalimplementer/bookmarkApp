import React from 'react';
import { ModalWrapper } from 'wrappers/modal-wrapper';
import { TextField, Textarea } from 'components/textfield';
import { Button } from 'components/button';

import type { BookmarkModalProps } from './types';
import classes from './classes.module.scss';

export const BookmarkModal = ({
   open,
   onClose,
   title,
   onTitleChange,
   onLinkChange,
   link,
   description,
   onDescriptionChange,
   onSubmit,
   loading,
}: BookmarkModalProps) => {
   return (
      <ModalWrapper open={open} onClose={onClose} className={classes.modal}>
         <div className={classes.inputsBox}>
            <TextField
               required
               placeholder='Title'
               label='Title'
               name='title'
               value={title}
               onChange={onTitleChange}
            />
            <TextField placeholder='Link' name='link' label='Link' value={link} onChange={onLinkChange} />
            <Textarea
               placeholder='Description'
               name='description'
               label='Description'
               value={description}
               onChange={onDescriptionChange}
            />
         </div>
         <Button disabled={loading} onClick={onSubmit}>
            Continue
         </Button>
      </ModalWrapper>
   );
};
