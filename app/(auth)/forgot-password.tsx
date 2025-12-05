import { AuthLayout } from '@/components/AuthLayout';
import { Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MethodOption = ({ icon, label, selected = false }: any) => (
    <TouchableOpacity style={[styles.methodCard, selected && styles.methodCardSelected]}>
        <View style={styles.iconCircle}>
            <Ionicons name={icon} size={28} color="#2E3B28" />
        </View>
        <Text style={styles.methodLabel}>{label}</Text>
    </TouchableOpacity>
)

export default function ForgotPasswordScreen() {
    return (
        <AuthLayout showBack>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Select contact details where you want to reset your password.</Text>

            <View style={styles.list}>
                <MethodOption icon="lock-closed" label="Password" />
                <MethodOption icon="shield-checkmark" label="Use 2FA" selected />
                <MethodOption icon="phone-portrait" label="Google Authenticator" />
            </View>

            <TouchableOpacity
                style={styles.sendBtn}
                onPress={() => router.back()}
            >
                <Text style={styles.sendText}>Send Password</Text>
                <Ionicons name="lock-open-outline" size={20} color="#FFF" />
            </TouchableOpacity>

        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: Spacing.s,
        fontFamily: Typography.heading,
    },
    subtitle: {
        color: '#AAA',
        fontSize: 14,
        marginBottom: Spacing.xl,
        lineHeight: 20
    },
    list: {
        gap: Spacing.m,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C211B',
        borderRadius: 30, // Big pills
        padding: 6,
        height: 70,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    methodCardSelected: {
        borderColor: '#8CAD65',
        borderWidth: 1,
    },
    iconCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#8CAD65', // Sage
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.m,
    },
    methodLabel: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sendBtn: {
        backgroundColor: '#8D6E63', // Coffee/Bronze
        borderRadius: Layout.radius.pill,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.xxl,
    },
    sendText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    }
});
