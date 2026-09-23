import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import { cn, colors } from '@/services';
import { StatusBar } from 'expo-status-bar';

const LoadingOverlay = ({ className }) => {
    const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

    return (
        <View
            className={cn("flex-1 absolute bottom-0 left-0 w-full h-full bg-black-900/30 flex items-center justify-center z-[1000]", className)}
            style={{ width: windowWidth, height: windowHeight }}>
            <View className="h-[125px] w-[125px] bg-white-50 flex items-center justify-center rounded-xl">
                <ActivityIndicator size="large" color={colors.main500} style={{ transform: [{ scale: 1.5 }] }} />
            </View>

            <StatusBar style="dark" backgroundColor='#00000045' />
        </View>
    )
}

export default LoadingOverlay