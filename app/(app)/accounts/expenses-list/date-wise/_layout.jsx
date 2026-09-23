import { Stack } from "expo-router";

const DateWiseExpensesLayout = () => {
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
      <Stack.Screen name="category" />
    </Stack>
  );
};

export default DateWiseExpensesLayout;
