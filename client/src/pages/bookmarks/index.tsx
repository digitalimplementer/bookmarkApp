import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageWrapper } from 'wrappers/page-wrapper';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { ENUM_ICON } from 'enums/icon';
import { handleTextfieldChange } from 'utils';
import { BookmarkModal } from 'modals/bookmark-modal';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { bookmarksState, createBookmark, fetchBookmarks } from 'store/bookmarks/bookmarks.slice';

import classes from './classes.module.scss';
import { routes } from 'routes/routes';

export function BookmarksPage() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { bookmarks } = useAppSelector(bookmarksState);

   const [modal, setModal] = useState(false);
   const [loader, setLoader] = useState(false);

   const [newBookmark, setNewBookmark] = useState({
      title: '',
      description: '',
      link: '',
   });

   const handleCreate = () => {
      if (!newBookmark.title.trim() || !newBookmark.link.trim()) {
         return;
      }
      setLoader(true);
      dispatch(
         createBookmark({
            title: newBookmark.title,
            link: newBookmark.link,
            description: newBookmark.description,
         }),
      ).then(() => {
         setNewBookmark({
            title: '',
            link: '',
            description: '',
         });
         setLoader(false);
         setModal(false);
      });
   };

   useEffect(() => {
      dispatch(fetchBookmarks());
   }, [dispatch]);

   const goTosingleBookmarkPage = (id: number) => {
      navigate(routes().singleBookmark.replace(':id', String(id)));
   };

   return (
      <>
         <PageWrapper>
            <div className={classes.cardsWrapper}>
               {bookmarks.length > 0 &&
                  bookmarks.map((item) => (
                     <div
                        key={item.id}
                        className={classes.cardBox}
                        onClick={() => goTosingleBookmarkPage(item.id)}
                     >
                        {item.title}
                     </div>
                  ))}
            </div>
            <div>
               <Button onClick={() => setModal(true)} startIcon={<Icon name={ENUM_ICON.PLUS} />}>
                  Create
               </Button>
            </div>
         </PageWrapper>
         {modal ? (
            <BookmarkModal
               open={modal}
               onClose={() => setModal(false)}
               title={newBookmark.title}
               onTitleChange={(e) => handleTextfieldChange(e, setNewBookmark)}
               link={newBookmark.link}
               onLinkChange={(e) => handleTextfieldChange(e, setNewBookmark)}
               description={newBookmark.description}
               onDescriptionChange={(e) => handleTextfieldChange(e, setNewBookmark)}
               onSubmit={handleCreate}
               loading={loader}
            />
         ) : null}
      </>
   );
}
