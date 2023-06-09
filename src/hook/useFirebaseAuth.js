import { useEffect, useState } from "react";
import { au } from "../api";

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    au.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(false);
      }
    });
  });
  return authUser;
};

export default useFirebaseAuth;
