export interface AuthSliceTypes {
   authMethod: AuthMethod;
   authUserData: AuthUserDataTypes;
   loggedUserData: LoggedUserDataTypes | null;
}

export interface AuthUserDataTypes {
   firstName?: string;
   lastName?: string;
   email: string;
   password: string;
}

export interface ResponseSignupUserData extends AuthUserDataTypes {
   id: number;
   createdAt: Date;
   updatedAt: Date;
}

export interface ResponseLoggedUserData extends Pick<AuthUserDataTypes, 'email'> {
   id: number;
   accessToken: string;
   refreshToken: string;
}

export interface LoggedUserDataTypes extends Omit<ResponseLoggedUserData, 'accessToken' | 'refreshToken'> {}

export interface LoginCredetialsTypes {
   email: string;
   password: string;
}

export type AuthMethod = 'login' | 'register';
