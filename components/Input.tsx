import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Colors, Layout, Spacing } from '../constants/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    icon?: React.ReactNode;
}

export const Input = ({ label, error, containerStyle, icon, style, onFocus, onBlur, ...props }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                isFocused && styles.focused,
                !!error && styles.errorBorder
            ]}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <TextInput
                    style={[styles.input, icon ? { paddingLeft: 40 } : null, style]}
                    placeholderTextColor={Colors.light.textSecondary}
                    onFocus={(e) => {
                        setIsFocused(true);
                        onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        onBlur?.(e);
                    }}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.m,
    },
    label: {
        marginBottom: Spacing.s,
        marginTop: Spacing.xs,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
    },
    inputContainer: {
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: Layout.radius.m,
        height: 50,
        justifyContent: 'center',
        position: 'relative',
    },
    input: {
        flex: 1,
        paddingHorizontal: Spacing.m,
        fontSize: 16,
        color: Colors.light.text,
        height: '100%',
    },
    focused: {
        borderColor: Colors.light.primary,
        backgroundColor: '#F0F9FF', // Very light blue tint
    },
    errorBorder: {
        borderColor: Colors.light.accent,
    },
    errorText: {
        color: Colors.light.accent,
        fontSize: 12,
        marginTop: 4,
    },
    icon: {
        position: 'absolute',
        left: Spacing.m,
        zIndex: 1,
    },
});
