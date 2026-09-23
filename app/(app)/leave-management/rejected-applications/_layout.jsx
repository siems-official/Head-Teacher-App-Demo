import { Stack } from "expo-router";

const AccountsLayout = () => {
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
      <Stack.Screen name="students" />
      <Stack.Screen name="teachers-and-staffs" />
    </Stack>
  );
};

export default AccountsLayout;
