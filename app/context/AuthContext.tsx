"use client";
import React, { useState, createContext, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getCookie } from "cookies-next";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      // try and grab the jwt from the cookie
      const jwt = getCookie("jwt"); // this grabs the cookie
      if (!jwt) {
        // you are not authenticated and you are not loading anymore
        return setAuthState({
          data: null,
          error: null,
          loading: false,
        });
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`; // after the initial request, after it works, set the other subsequent requests to have this bearer token

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
