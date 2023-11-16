export interface UserSliceTypes {
   user: UserTypes | null;
}

export interface UserTypes {
   createdAt: Date;
   email: string;
   firstName: string;
   id: number;
   lastName: string;
   updatedAt: Date;
}
