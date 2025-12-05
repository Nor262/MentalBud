import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function MindfulnessScreen() {
    const [minutes, setMinutes] = useState(25);

    return (
        <View style={styles.container}>
            {/* Wavy Header Background */}
            <View style={styles.header}>
                <Svg height="100%" width={width} style={StyleSheet.absoluteFillObject}>
                    <Path d={`M0,0 L${width},0 L${width},250 Q${width / 2},350 0,250 Z`} fill="#3E2D23" />
                </Svg>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Breathing</Text>
                    <TouchableOpacity style={styles.circleBtn}>
                        <Ionicons name="musical-notes-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Main Content Centered in Curve */}
                <View style={styles.heroContent}>
                    <Text style={styles.heroQn}>How long do you want to{'\n'}do breathing exercise?</Text>
                </View>
            </View>

            <View style={styles.content}>
                {/* Input Time Cards */}
                <View style={styles.inputsRow}>
                    <View style={styles.timeBlock}>
                        <TouchableOpacity onPress={() => setMinutes(m => m + 5)}><Ionicons name="chevron-up" size={24} color="#AAA" /></TouchableOpacity>
                        <View style={[styles.timeCard, { backgroundColor: '#8CAD65' }]}>
                            <Text style={styles.timeVal}>{minutes}</Text>
                            <Text style={styles.timeLabel}>MIN</Text>
                        </View>
                        <TouchableOpacity onPress={() => setMinutes(m => Math.max(5, m - 5))}><Ionicons name="chevron-down" size={24} color="#AAA" /></TouchableOpacity>
                    </View>

                    <Text style={styles.colon}>:</Text>

                    <View style={styles.timeBlock}>
                        <TouchableOpacity><Ionicons name="chevron-up" size={24} color="#44352D" /></TouchableOpacity>
                        <View style={[styles.timeCard, { backgroundColor: '#2C211B' }]}>
                            <Text style={[styles.timeVal, { color: '#8D6E63' }]}>00</Text>
                            <Text style={[styles.timeLabel, { color: '#8D6E63' }]}>SEC</Text>
                        </View>
                        <TouchableOpacity><Ionicons name="chevron-down" size={24} color="#44352D" /></TouchableOpacity>
                    </View>
                </View>

                {/* Sound Selection */}
                <TouchableOpacity style={styles.soundPill}>
                    <Ionicons name="leaf" size={16} color="#8CAD65" />
                    <Text style={styles.soundText}>SOUND: FOREST RAIN</Text>
                    <Ionicons name="chevron-forward" size={16} color="#AAA" />
                </TouchableOpacity>

                {/* Start Button */}
                <TouchableOpacity style={styles.startBtn} onPress={() => { /* Start Timer Logic */ }}>
                    <Text style={styles.btnText}>Start Exercise</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1610',
    },
    header: {
        height: 350,
        position: 'relative',
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.l, paddingTop: 60,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    heroContent: { alignItems: 'center', marginTop: 40 },
    heroQn: { fontSize: 24, color: '#FFF', textAlign: 'center', fontWeight: 'bold', fontFamily: Typography.heading, lineHeight: 32 },

    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: -20, // Pull up closer to inputs
    },
    inputsRow: {
        flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40,
    },
    timeBlock: { alignItems: 'center', gap: 10 },
    timeCard: {
        width: 100, height: 120, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
        shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10,
    },
    timeVal: { fontSize: 48, fontWeight: 'bold', color: '#FFF' },
    timeLabel: { fontSize: 10, fontWeight: 'bold', color: 'rgba(255,255,255,0.6)', marginTop: 4 },
    colon: { fontSize: 48, fontWeight: 'bold', color: '#FFF', marginBottom: 20 },

    soundPill: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#332419', paddingHorizontal: 20, paddingVertical: 16, borderRadius: 30, gap: 10, marginBottom: 40, width: '80%', justifyContent: 'space-between',
    },
    soundText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },

    startBtn: {
        width: '80%', height: 60, borderRadius: 30, backgroundColor: '#8CAD65', alignItems: 'center', justifyContent: 'center',
        shadowColor: "#8CAD65", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
    },
    btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
