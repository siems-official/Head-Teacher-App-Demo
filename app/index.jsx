import Loading from "@/components/ui/Loading";
import useAuthCheck from "@/hooks/useAuthCheck";
import useShouldUpdate from "@/hooks/useShouldUpdate";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { checkingUpdate, updateAvailable } = useShouldUpdate(); // either true or false
  const authChecked = useAuthCheck();
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!checkingUpdate && authChecked) {
    if (isAuthenticated) {
      return <Redirect href="/(app)" />;
    } else {
      return <Redirect href="/login" />;
    }
  }

  return <Loading />;
};

export default HomeScreen;
