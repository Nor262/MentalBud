import { AuthLayout } from '@/components/AuthLayout';
import { Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
    return (
        <AuthLayout>
            <Text style={styles.title}>Sign Up For Free</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="happy-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email..."
                        placeholderTextColor="#666"
                    />
                </View>
                {/* Mock Error State */}
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={16} color="#FFF" style={{ marginRight: 4 }} />
                    <Text style={styles.errorText}>Invalid Email Address!!</Text>
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password..."
                        placeholderTextColor="#666"
                        secureTextEntry
                    />
                    <Ionicons name="eye-outline" size={20} color="#666" />
                </View>

                <View style={styles.termsRow}>
                    <Ionicons name="checkbox" size={20} color="#FFF" style={{ marginRight: 8 }} />
                    <Text style={styles.termsText}>I Agree with the <Text style={styles.linkText}>Terms & Conditions</Text></Text>
                </View>

                <TouchableOpacity
                    style={styles.signUpBtn}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={styles.signUpText}>Sign Up</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.linkText}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: Spacing.xl,
        fontFamily: Typography.heading,
    },
    form: {
        gap: Spacing.m,
    },
    label: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C211B', // Mocha
        borderRadius: Layout.radius.pill,
        paddingHorizontal: Spacing.l,
        height: 56,
        borderWidth: 1,
        borderColor: '#44352D',
    },
    errorContainer: {
        backgroundColor: '#B7410E', // Dark Orange/Rust for error
        borderRadius: Layout.radius.pill,
        paddingHorizontal: Spacing.l,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: '#FFF', fontSize: 12, fontWeight: 'bold'
    },
    input: {
        flex: 1,
        color: '#FFF',
        fontSize: 14,
    },
    signUpBtn: {
        backgroundColor: '#8D6E63', // Coffee/Bronze
        borderRadius: Layout.radius.pill,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.m,
    },
    signUpText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    termsRow: {
        flexDirection: 'row', alignItems: 'center', marginTop: Spacing.s
    },
    termsText: {
        color: '#8B7D76', fontSize: 12
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.xl,
    },
    footerText: {
        color: '#8B7D76',
    },
    linkText: {
        color: '#FF8C60', // Orange accent
        fontWeight: 'bold',
    },
});
