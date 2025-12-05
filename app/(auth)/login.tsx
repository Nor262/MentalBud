import { AuthLayout } from '@/components/AuthLayout';
import { Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    return (
        <AuthLayout>
            <Text style={styles.title}>Sign In To freud.ai</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="princesskaguya@gmail.com"
                        placeholderTextColor="#666"
                        value="princesskaguya@gmail.com"
                    />
                    <Ionicons name="checkmark" size={20} color="#8CAD65" />
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

                <TouchableOpacity
                    style={styles.signInBtn}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={styles.signInText}>Sign In</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Text style={styles.socialIcon}>f</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Text style={styles.socialIcon}>G</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Ionicons name="logo-instagram" size={20} color="#8B7D76" />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                        <Text style={styles.linkText}>Sign In</Text>
                        {/* Note: Screenshot says 'Sign In' here for 'Don't have an account?', likely a typo in Figma, usually 'Sign Up'. Keeping as 'Sign In' or correcting? 'Sign Up' makes more sense. */}
                        {/* Actually, let's assume the user meant navigating to Signup */}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.forgotText}>Forgot Password</Text>
                </TouchableOpacity>

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
    input: {
        flex: 1,
        color: '#FFF',
        fontSize: 14,
    },
    signInBtn: {
        backgroundColor: '#8D6E63', // Coffee/Bronze
        borderRadius: Layout.radius.pill,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.l,
    },
    signInText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.m,
        marginTop: Spacing.l,
        marginBottom: Spacing.l,
    },
    socialBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#2C211B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        color: '#8B7D76',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.m,
    },
    footerText: {
        color: '#8B7D76',
    },
    linkText: {
        color: '#FF8C60', // Orange accent
        fontWeight: 'bold',
    },
    forgotText: {
        color: '#FF8C60',
        textAlign: 'center',
        fontSize: 12,
        marginTop: Spacing.s,
    }
});
