import { Button } from '@/components/Button';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={[Colors.dark.background, '#2E1C4E']} // Deep purple gradient
                style={styles.background}
            />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logoPlaceholder}>
                        <LinearGradient
                            colors={Colors.dark.primaryGradient as any}
                            style={styles.logoGradient}
                        >
                            <Text style={styles.logoText}>F</Text>
                        </LinearGradient>
                    </View>
                    <Text style={styles.title}>Freud</Text>
                    <Text style={styles.subtitle}>Your Mental Health Companion</Text>
                </View>

                <View style={styles.illustration}>
                    {/* Abstract glowing shapes */}
                    <LinearGradient
                        colors={[Colors.dark.primary, 'transparent']}
                        style={styles.glow1}
                    />
                    <LinearGradient
                        colors={[Colors.dark.secondary, 'transparent']}
                        style={styles.glow2}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.tagline}>Find peace in the chaos.</Text>
                    <Button
                        title="Sign In"
                        onPress={() => router.push('/(auth)/login')}
                        style={styles.button}
                        textStyle={styles.buttonText}
                    />
                    <Button
                        title="Create Account"
                        variant="outline"
                        onPress={() => router.push('/(auth)/signup')}
                        style={[styles.button, styles.outlineButton]}
                        textStyle={styles.outlineText}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        padding: Spacing.l,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: Spacing.xxl * 1.5,
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        marginBottom: Spacing.m,
        borderRadius: 25,
        overflow: 'hidden',
    },
    logoGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: Typography.heading,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: Colors.dark.text,
        marginBottom: Spacing.xs,
        fontFamily: Typography.heading,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.dark.textSecondary,
        textAlign: 'center',
        fontFamily: Typography.body,
    },
    illustration: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    glow1: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        opacity: 0.15,
        position: 'absolute',
        top: 50,
        left: -50,
    },
    glow2: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        opacity: 0.1,
        position: 'absolute',
        bottom: 80,
        right: -30,
    },
    footer: {
        marginBottom: Spacing.xl,
    },
    tagline: {
        color: Colors.dark.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.l,
        fontStyle: 'italic',
        fontFamily: Typography.heading,
    },
    button: {
        marginBottom: Spacing.m,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '600',
    },
    outlineButton: {
        borderColor: Colors.dark.textSecondary,
    },
    outlineText: {
        color: Colors.dark.text,
    }
});
