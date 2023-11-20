import React, { useState, useEffect, useRef } from 'react';

import { TextField } from 'components/textfield';
import { Avatar } from 'components/avatar';
import { Button } from 'components/button';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { updateUser, userState, uploadAvatar } from 'store/user/user.slice';
import { PageWrapper } from 'wrappers/page-wrapper';
import { handleTextfieldChange } from 'utils';

import classes from './classes.module.scss';

export function ProfilePage() {
   const dispatch = useAppDispatch();
   const inputRef = useRef<HTMLInputElement>(null);

   const { user } = useAppSelector(userState);
   const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
   });
   const [avatar, setAvatar] = useState<string | null>(null);
   const [hasChanges, setHasChanges] = useState(false);

   useEffect(() => {
      if (user) {
         setUserData(user);
      }
   }, [user]);

   const handleSave = () => {
      dispatch(updateUser(userData));
   };
   console.log('a', avatar);
   const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const files = event.target.files;

      if (files) {
         const formData = new FormData();
         for (let i = 0; i < files.length; i++) {
            const file = files[i];
            formData.append('file', file);
         }
         dispatch(uploadAvatar(formData)).then(({ payload }) => {
            setAvatar(payload?.path);
         });
      }
   };

   return (
      <PageWrapper>
         <div className={classes.topBarsWrapper}>
            <div className={classes.mainContentBox}>
               <div className={classes.avatarWrapper}>
                  <Avatar src={avatar} />
                  <Button textTransform='capitalize' fullWidth onClick={() => inputRef.current?.click()}>
                     Upload
                  </Button>
                  <input
                     type='file'
                     accept='image/png, image/jpeg'
                     hidden
                     multiple={false}
                     ref={inputRef}
                     onChange={handleFileInputChange}
                  />
                  <Button textTransform='capitalize' variant='text' fullWidth>
                     Remove
                  </Button>
               </div>
               <div className={classes.inputsWrapper}>
                  <TextField
                     label='First Name'
                     value={userData.firstName}
                     name='firstName'
                     onChange={(e) => handleTextfieldChange(e, setUserData)}
                  />
                  <TextField
                     label='Last Name'
                     name='lastName'
                     value={userData.lastName}
                     onChange={(e) => handleTextfieldChange(e, setUserData)}
                  />
               </div>
            </div>
            <div className={classes.buttonBox}>
               <Button onClick={handleSave}>Save</Button>
            </div>
         </div>
      </PageWrapper>
   );
}
