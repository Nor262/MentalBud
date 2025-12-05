import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MindfulnessScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Mindful Exercise</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <Text style={styles.qn}>How long do you want to{'\n'}do breathing exercise?</Text>

                <View style={styles.inputsRow}>
                    <View style={[styles.inputBlock, { backgroundColor: '#8CAD65' }]}>
                        <Text style={styles.inputVal}>25</Text>
                    </View>
                    <View style={[styles.inputBlock, { backgroundColor: '#2C211B' }]}>
                        <Text style={[styles.inputVal, { color: '#8D6E63' }]}>00</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.soundChip}>
                    <Ionicons name="musical-note" size={16} color="#FFF" />
                    <Text style={styles.soundText}>SOUND: CHIRPING BIRDS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.startBtn} onPress={() => { }}>
                    <Text style={styles.btnText}>Start Exercise</Text>
                    <Ionicons name="time-outline" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
        paddingBottom: Spacing.m,
    },
    backBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#666', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    qn: {
        fontSize: 24, textAlign: 'center', color: '#FFF', fontWeight: 'bold', marginBottom: 40, fontFamily: Typography.heading,
    },
    inputsRow: {
        flexDirection: 'row', gap: 20, marginBottom: 40,
    },
    inputBlock: {
        width: 120, height: 120, borderRadius: 30, alignItems: 'center', justifyContent: 'center',
    },
    inputVal: {
        fontSize: 48, fontWeight: 'bold', color: '#FFF'
    },
    soundChip: {
        flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3E2D23', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20, marginBottom: 60,
    },
    soundText: {
        color: '#AAA', fontSize: 12, fontWeight: 'bold',
    },
    startBtn: {
        width: '80%', height: 60, backgroundColor: '#8D6E63', borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    }
    ,
    btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
