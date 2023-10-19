import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthorization = () => {
  const [isUserExist, setIsUserExist] = useState<boolean>(false);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setIsUserExist(true);
      else setIsUserExist(false);
    });
  }, [auth]);

  return { isUserExist };
};
