import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, Layout, Spacing } from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: React.ReactNode;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon
}: ButtonProps) => {
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';
    const isGhost = variant === 'ghost';

    const content = (
        <>
            {loading ? (
                <ActivityIndicator color={isPrimary ? '#FFF' : Colors.dark.primary} />
            ) : (
                <>
                    {icon && icon}
                    <Text style={[
                        styles.text,
                        isPrimary && styles.textPrimary,
                        isOutline && styles.textOutline,
                        isGhost && styles.textGhost,
                        disabled && styles.textDisabled,
                        textStyle
                    ]}>
                        {title}
                    </Text>
                </>
            )}
        </>
    );

    if (isPrimary && !disabled) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, style]}>
                <LinearGradient
                    colors={Colors.dark.primaryGradient as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient, styles.button]}
                >
                    {content}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                isOutline && styles.buttonOutline,
                isGhost && styles.buttonGhost,
                disabled && styles.buttonDisabled,
                style
            ]}
        >
            {content}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: Layout.radius.xl,
        overflow: 'hidden',
    },
    gradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.m,
        paddingHorizontal: Spacing.l,
        borderRadius: Layout.radius.xl,
        minHeight: 50,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Colors.dark.primary,
    },
    buttonGhost: {
        backgroundColor: 'transparent',
    },
    buttonDisabled: {
        backgroundColor: Colors.dark.border,
        borderColor: Colors.dark.border,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    textPrimary: {
        color: '#FFF',
    },
    textOutline: {
        color: Colors.dark.primary,
    },
    textGhost: {
        color: Colors.dark.primary,
    },
    textDisabled: {
        color: Colors.dark.textSecondary,
    },
});
