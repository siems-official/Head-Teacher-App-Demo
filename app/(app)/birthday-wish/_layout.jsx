import { Stack } from "expo-router";

const BirthdayWishLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 500,
        animationTypeForReplace: "push",
        presentation: "modal",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default BirthdayWishLayout;
