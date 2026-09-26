import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "@/store/auth/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const localAuth = await AsyncStorage.getItem("auth");
      const currentTimestamp = moment().unix();

      if (localAuth) {
        const auth = JSON.parse(localAuth);

        if (auth?.token) {
          const expireTime = jwtDecode(auth.token).exp;
          const checkExpire = expireTime > currentTimestamp;

          if (checkExpire) dispatch(setCredentials(auth));
          else {
            await AsyncStorage.removeItem("auth");
            dispatch(logout());
          }
        } else {
          await AsyncStorage.removeItem("auth");
          dispatch(logout());
        }
      }
    } catch (error) {
      await AsyncStorage.removeItem("auth");
      dispatch(logout());
      if (__DEV__) console.warn("Auth check failed, cleared stored auth", error);
    } finally {
      setAuthChecked(true);
    }
  };
  useEffect(() => {
    const checkAuthTimeout = setTimeout(() => {
      // just a custom delay for splash screen
      checkAuth();
    }, 2000);
    return () => clearTimeout(checkAuthTimeout);
  }, []);
  return authChecked;
};

export default useAuthCheck;
