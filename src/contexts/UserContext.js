"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (user) => {
    console.log(user);
    if(!user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return;
    }

    const data = jwtDecode(user.access);
    localStorage.setItem('user', JSON.stringify({ id: data.user_id, ...user }));
    setUser({ id: data.user_id, ...user });
  }

  return (
    <userContext.Provider value={{ user, updateUser }}>
        {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
