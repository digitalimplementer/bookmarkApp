import { AuthPage } from 'pages/auth';
import { HomePage } from 'pages/home';
import { BookmarksPage } from 'pages/bookmarks';
import { ProfilePage } from 'pages/profile';
import { SingleBookmarkPage } from 'pages/single-bookmark';

import { routes } from './routes';

export const routesData = [
   {
      path: routes().welcome,
      Component: AuthPage,
      id: 1,
      isAuth: false,
   },
   {
      path: routes().home,
      Component: HomePage,
      id: 2,
      isAuth: true,
   },
   {
      path: routes().bookmarks,
      Component: BookmarksPage,
      id: 3,
      isAuth: true,
   },
   {
      path: routes().profile,
      Component: ProfilePage,
      id: 4,
      isAuth: true,
   },
   {
      path: routes().singleBookmark,
      Component: SingleBookmarkPage,
      id: 5,
      isAuth: true,
   },
];
