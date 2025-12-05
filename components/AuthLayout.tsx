import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface AuthLayoutProps {
    children: React.ReactNode;
    showBack?: boolean;
}

export const AuthLayout = ({ children, showBack = false }: AuthLayoutProps) => {
    return (
        <View style={styles.container}>
            {/* Green Curved Header */}
            <View style={styles.header}>
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                    {/* Dark Green Background */}
                    <Path
                        d={`M0,0 L${width},0 L${width},150 Q${width / 2},220 0,150 Z`}
                        fill="#2E3B28"
                    />
                    {/* Logo / 4 Dots */}
                    <Path d={`M${width / 2 - 10},80 h8 v8 h-8 z`} fill="#FFF" opacity={0.9} />
                    <Path d={`M${width / 2 + 2},80 h8 v8 h-8 z`} fill="#FFF" opacity={0.9} />
                    <Path d={`M${width / 2 - 10},92 h8 v8 h-8 z`} fill="#FFF" opacity={0.9} />
                    <Path d={`M${width / 2 + 2},92 h8 v8 h-8 z`} fill="#FFF" opacity={0.9} />
                </Svg>
                {showBack && (
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
    },
    header: {
        height: 200,
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 180, // Push content below curve
        paddingHorizontal: Spacing.l,
    },
    backBtn: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
