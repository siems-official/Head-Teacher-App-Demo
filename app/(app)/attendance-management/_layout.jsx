import { Stack } from "expo-router";

const AttendanceLayout = () => {
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
            <Stack.Screen name="list" />
            <Stack.Screen name="grid" />
        </Stack>
    );
};

export default AttendanceLayout;