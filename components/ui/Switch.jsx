import React from "react";
import { Pressable, Animated } from "react-native";

const Switch = ({ value, onValueChange, disabled, ...props }) => {
    const translateX = React.useRef(new Animated.Value(value ? 18 : 0)).current;

    // Animate the switch when toggled
    React.useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 22 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value]);


    return (
        <Pressable
            onPress={() => !disabled && onValueChange(!value)}
            style={
                {
                    width: 46,
                    height: 25,
                    borderRadius: 24,
                    backgroundColor: value ? "#56AD7E" : "#D1D1D6",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 2,
                    opacity: disabled ? 0.65 : 1,
                }}
            {...props}
        >
            <Animated.View
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: "#FFF",
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 2,
                    transform: [{ translateX }],
                }}
            />
        </Pressable>
    );
};

export default Switch;
