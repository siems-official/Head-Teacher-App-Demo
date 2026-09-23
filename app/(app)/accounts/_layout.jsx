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
      <Stack.Screen name="collections" />
      <Stack.Screen name="collection-heads" />
      <Stack.Screen name="expenses-list" />
      <Stack.Screen name="due-list-class" />
      <Stack.Screen name="due-list-section" />
      <Stack.Screen name="due-list-student" />
      <Stack.Screen name="paid-list-class" />
      <Stack.Screen name="paid-list-section" />
      <Stack.Screen name="paid-list-student" />
    </Stack>
  );
};

export default AccountsLayout;
