export interface AuthUserInterface {
  id: number | null;
  token: string | null;
  isLogin: boolean | false;
}

export type AuthProviderState = {
  auth: AuthUserInterface;
};

export type AuthUserContextType = {
  user: AuthUserInterface;
};





