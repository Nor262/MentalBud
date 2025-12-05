import { Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function UpgradeScreen() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.illustration}>
                {/* Placeholder for "Falling Man" illustration */}
                <Svg height="250" width="300" viewBox="0 0 200 200">
                    {/* Just abstract shapes */}
                    <Path d="M20 20 Q100 0 180 20 L 160 100 Q100 120 40 100 Z" fill="#4CAF50" opacity={0.8} />
                    <Path d="M80 80 L120 80 L100 150 Z" fill="#FFF" />
                </Svg>
            </View>

            <View style={styles.content}>
                {/* Curve */}
                <Svg height="100" width={width} style={{ position: 'absolute', top: -50, left: 0, right: 0 }}>
                    <Path d={`M0,50 Q${width / 2},10 ${width},50 L${width},100 L0,100 Z`} fill="#1F1410" />
                </Svg>

                <Text style={styles.title}>Unlimited Chat. Go Pro.</Text>

                {/* Toggle */}
                <View style={styles.toggleRow}>
                    <Text style={[styles.periodText, !isYearly && styles.periodActive]}>Yearly</Text>
                    <Switch
                        value={isYearly}
                        onValueChange={setIsYearly}
                        trackColor={{ false: '#8CAD65', true: '#8CAD65' }}
                        thumbColor="#FFF"
                    />
                    <Text style={[styles.periodText, isYearly && styles.periodActive]}>Monthly</Text>
                </View>

                {/* Pricing Cards */}
                <View style={styles.cardsRow}>
                    <TouchableOpacity style={styles.planCard}>
                        <Text style={styles.planName}>Pro</Text>
                        <Text style={styles.planPrice}>$5.99/mo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.planCard, styles.planActive]}>
                        <Text style={[styles.planName, { color: '#2E3B28' }]}>Enterprise</Text>
                        <Text style={[styles.planPrice, { color: '#2E3B28' }]}>$6.99/mo</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.upgradeBtn}>
                    <Text style={styles.btnText}>Go Pro, Now!</Text>
                    <Ionicons name="star" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3E4A35', // Dark Swamp Green
    },
    header: {
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
    },
    backBtn: {
        width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center'
    },
    illustration: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: '#1F1410',
        padding: Spacing.xl,
        alignItems: 'center',
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: Typography.heading,
        fontWeight: 'bold',
        marginBottom: Spacing.l,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: Spacing.xl,
    },
    periodText: {
        color: '#666',
        fontWeight: 'bold',
    },
    periodActive: {
        color: '#FFF',
    },
    cardsRow: {
        flexDirection: 'row',
        gap: Spacing.m,
        width: '100%',
        marginBottom: Spacing.xl,
    },
    planCard: {
        flex: 1,
        backgroundColor: '#2C211B',
        padding: Spacing.l,
        borderRadius: Layout.radius.l,
        height: 100,
        justifyContent: 'center',
    },
    planActive: {
        backgroundColor: '#8CAD65', // Sage
    },
    planName: {
        color: '#AAA',
        marginBottom: 8,
    },
    planPrice: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Typography.heading,
    },
    upgradeBtn: {
        backgroundColor: '#8D6E63', // Coffee/Bronze
        width: '100%',
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    btnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
