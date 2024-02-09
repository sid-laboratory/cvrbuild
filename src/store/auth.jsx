import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [getuser, setUser] = useState("");
  // const [loggedout, setLoggedout] = useState(token);

  const storeToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const isLoggedIn = !!token;

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:1212/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("From login ra", response);
      if (response.ok) {
        const data = await response.json();
        console.log("user authenticated :", data.userData);
        setUser(data); // Assuming the server sends user details
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [isLoggedIn]);

  console.log("after logging in :", isLoggedIn);

  return (
    <AuthContext.Provider
      value={{ storeToken, isLoggedIn, logout, userAuthentication, getuser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
