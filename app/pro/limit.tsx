import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function LimitReachedScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.illustration}>
                {/* Using a placeholder SVG or illustration here. 
              In real app, this would be the "Crying Girl" image from Figma.
              For now, using a simple SVG shape to represent it.
          */}
                <Svg height="200" width="200" viewBox="0 0 100 100">
                    <Path d="M50 10 Q80 10 90 40 T50 90 T10 40 T50 10" fill="#FF8C60" />
                    {/* Tears */}
                    <Path d="M30 50 Q30 60 35 60 T40 50" fill="#87CEEB" />
                    <Path d="M70 50 Q70 60 75 60 T80 50" fill="#87CEEB" />
                </Svg>
            </View>

            <View style={styles.content}>
                <View style={styles.curveBg}>
                    <Svg height="100" width={width} style={{ position: 'absolute', top: -50 }}>
                        <Path d={`M0,50 Q${width / 2},-20 ${width},50 L${width},100 L0,100 Z`} fill="#1F1410" />
                    </Svg>
                </View>

                <Text style={styles.title}>Oops, Out of Token!</Text>
                <Text style={styles.subtitle}>Upgrade to Premium Version for unlimited AI Therapy.</Text>

                <TouchableOpacity style={styles.upgradeBtn} onPress={() => router.push('/pro/upgrade')}>
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
        backgroundColor: '#C85A2E', // Burnt Orange Background for top half
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
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
    curveBg: {
        width: '100%',
        height: 20,
    },
    title: {
        fontSize: 28,
        color: '#FFF',
        fontFamily: Typography.heading,
        fontWeight: 'bold',
        marginBottom: Spacing.m,
    },
    subtitle: {
        color: '#AAA',
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 22,
        maxWidth: '80%',
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
