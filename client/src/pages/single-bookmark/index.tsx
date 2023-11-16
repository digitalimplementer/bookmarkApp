import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/hooks';
import { fetchSingleBookmark, deleteBookmark, editBookmark } from 'store/bookmarks/bookmarks.slice';
import { PageWrapper } from 'wrappers/page-wrapper';
import type { BookmarkTypes } from 'store/bookmarks/types';
import { Button } from 'components/button';
import { routes } from 'routes/routes';
import { handleTextfieldChange } from 'utils';
import { BookmarkModal } from 'modals/bookmark-modal';

export function SingleBookmarkPage() {
   const params = useParams();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const [bookmark, setBookmark] = useState<BookmarkTypes | null>(null);
   const [modal, setModal] = useState(false);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      if (params?.id) {
         dispatch(fetchSingleBookmark(params?.id)).then((res) => {
            setBookmark(res.payload);
         });
      }
   }, [dispatch, params?.id]);

   if (!bookmark) {
      return <PageWrapper>Error....</PageWrapper>;
   }

   const handleRemoveBookmark = () => {
      dispatch(deleteBookmark(String(bookmark.id))).then(() => {
         navigate(routes().bookmarks);
      });
   };

   const handleSaveEditedBookmark = () => {
      if (!bookmark.title.trim() || !bookmark.link.trim()) {
         return;
      }
      setLoader(true);
      dispatch(
         editBookmark({
            id: String(bookmark.id),
            data: { title: bookmark.title, link: bookmark.link, description: bookmark.description },
         }),
      ).then(() => {
         setModal(false);
         setLoader(false);
      });
   };

   return (
      <>
         <PageWrapper>
            <div>
               <h3>{bookmark.title}</h3>
               <Link to={bookmark.link} target='_blank'>
                  {bookmark?.link}
               </Link>
               <p>{bookmark.description}</p>
            </div>
            <div>
               <Button textTransform='capitalize' onClick={() => setModal(true)}>
                  Edit
               </Button>
               <Button textTransform='capitalize' variant='text' onClick={handleRemoveBookmark}>
                  Delete
               </Button>
            </div>
         </PageWrapper>
         {modal ? (
            <BookmarkModal
               open={modal}
               onClose={() => setModal(false)}
               title={bookmark.title}
               onTitleChange={(e) => handleTextfieldChange(e, setBookmark)}
               link={bookmark.link}
               onLinkChange={(e) => handleTextfieldChange(e, setBookmark)}
               description={bookmark.description}
               onDescriptionChange={(e) => handleTextfieldChange(e, setBookmark)}
               onSubmit={handleSaveEditedBookmark}
               loading={loader}
            />
         ) : null}
      </>
   );
}
