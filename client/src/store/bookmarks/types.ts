export interface BookmarksSliceTypes {
   bookmarks: BookmarkTypes[] | [];
   bookmark: BookmarkTypes | null;
}

export interface ActionBookmarkTypes {
   title: string;
   link: string;
   description?: string;
}

export interface BookmarkTypes extends ActionBookmarkTypes {
   createdAt: Date;
   id: number;
   updatedAt: Date;
   userId: number;
}
