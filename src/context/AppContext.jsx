import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/Axios";
import toast from "react-hot-toast";
const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");


  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      console.log("Error in fetchBlogs!:", error.response?.data);
      toast.error(error.response?.data?.message || "Internal Server Error!");
    }
  };

  useEffect(() => {
    fetchBlogs();

    const token = localStorage.getItem("token");
    if (token && !token === null) {
      setToken(token);
      api.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  const appValues = {
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };
  return (
    <appContext.Provider value={appValues}>{children}</appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
