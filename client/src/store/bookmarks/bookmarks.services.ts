import apiInstance from 'api';
import { apiPaths } from 'api/api.paths';

import type { ActionBookmarkTypes } from './types';

export const serviceCreateBookmark = (data: ActionBookmarkTypes) => {
   return apiInstance.post(apiPaths.bookmarks.create, data);
};

export const serviceGetAllBookmarks = () => {
   return apiInstance.get(apiPaths.bookmarks.getAll);
};

export const serviceGetBookmark = (id: string) => {
   return apiInstance.get(apiPaths.bookmarks.getSingle.replace(':id', id));
};

export const serviceDeleteBookmark = (id: string) => {
   return apiInstance.delete(apiPaths.bookmarks.delete.replace(':id', id));
};

export const serviceEditBookmark = (id: string, data: ActionBookmarkTypes) => {
   return apiInstance.patch(apiPaths.bookmarks.edit.replace(':id', id), data);
};
