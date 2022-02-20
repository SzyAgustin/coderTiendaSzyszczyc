import React, { createContext, useState } from 'react';

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
}

interface IUserState {
  user?: IUser;
  setUser?: any;
}

const initialState: IUserState = {};

interface UserProviderProps {
  children: any;
}

export const UserContext = createContext<IUserState>(initialState);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

