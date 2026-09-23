import { Stack } from "expo-router";

const StudentAttendanceLayout = () => {
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
      <Stack.Screen name="absent-alert" />
      <Stack.Screen name="absent-history" />
      <Stack.Screen name="absent" />
      <Stack.Screen name="class-attendance" />
      <Stack.Screen name="class-specific-attendance" />
      <Stack.Screen name="index" />
      <Stack.Screen name="present" />
      <Stack.Screen name="section-specific-attendance" />
    </Stack>
  );
};

export default StudentAttendanceLayout;
