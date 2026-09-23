import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onKeyboardDidShow = (e) => {
      setKeyboardHeight(e.endCoordinates.height); // measures the total height of the keyboard itself
      setKeyboardVisible(true);
    };

    const onKeyboardDidHide = () => {
      setKeyboardHeight(0);
      setKeyboardVisible(false);
    };

    const showSub = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    const hideSub = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return { keyboardVisible, keyboardHeight };
};

export default useKeyboard;
