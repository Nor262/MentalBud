import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Layout, Spacing } from '../constants/theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'elevated' | 'flat' | 'outlined';
}

export const Card = ({ children, style, variant = 'elevated' }: CardProps) => {
    return (
        <View style={[
            styles.card,
            variant === 'elevated' && styles.elevated,
            variant === 'flat' && styles.flat,
            variant === 'outlined' && styles.outlined,
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: Layout.radius.l,
        padding: Spacing.m,
        backgroundColor: Colors.light.surface,
        marginBottom: Spacing.m,
    },
    elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    flat: {
        backgroundColor: Colors.light.background,
    },
    outlined: {
        borderWidth: 1,
        borderColor: Colors.light.border,
        backgroundColor: 'transparent',
    },
});
