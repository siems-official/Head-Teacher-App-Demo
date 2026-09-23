import { Linking } from "react-native";
import Toast from "react-native-simple-toast";

export const handleCallPress = ({ number }) => {
  if (number) {
    const url = `tel:${number}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open phone app:", err)
    );
  } else {
    console.warn("Phone number is missing!");
    Toast.show("Phone number is missing!", Toast.BOTTOM, Toast.LONG);
  }
};

export const handleChatPress = ({ number }) => {
  if (number) {
    const url = `sms:${number}${`?body=${encodeURIComponent("Hi there!")}`}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open messaging app:", err)
    );
  } else {
    console.warn("Phone number is missing!");
    Toast.show("Phone number is missing!", Toast.BOTTOM, Toast.LONG);
  }
};

export const handleMailPress = ({ email }) => {
  if (email) {
    const url = `mailto:${email}?${`subject=${encodeURIComponent(
      "Discussion about result"
    )}`}${`&body=${encodeURIComponent("Hi there!")}`}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open email app:", err)
    );
  } else {
    console.warn("Email address is missing!");
    Toast.show("Email address is missing!", Toast.BOTTOM, Toast.LONG);
  }
};
