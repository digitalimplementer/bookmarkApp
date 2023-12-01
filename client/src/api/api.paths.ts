const auth = 'auth';
const bookmarks = 'bookmarks';
const users = 'users';

export const apiPaths = {
   [auth]: {
      register: `/${auth}/signup`,
      login: `/${auth}/signin`,
      refreshToken: `/${auth}/refresh`,
   },
   [bookmarks]: {
      create: `/${bookmarks}/create`,
      getAll: `/${bookmarks}`,
      getSingle: `/${bookmarks}/:id`,
      delete: `/${bookmarks}/delete/:id`,
      edit: `/${bookmarks}/edit/:id`,
   },
   [users]: {
      get: `/${users}/me`,
      update: `/${users}/update`,
      uploadAvatar: `/${users}/upload`,
      getAvatar: `/${users}/getAvatar`,
      removeAvatar: `/${users}/removeAvatar`,
   },
} as const;
