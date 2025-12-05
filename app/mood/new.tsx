import { Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mood States
const MOODS = [
    { label: "I'm Feeling Depressed", color: '#301b57', faceColor: '#9575CD', img: require('../../assets/images/Depressed.png') },
    { label: "I'm Feeling Sad", color: '#8c3310', faceColor: '#FF7043', img: require('../../assets/images/Sad.png') },
    { label: "I'm Feeling Neutral", color: '#4E342E', faceColor: '#8D6E63', img: require('../../assets/images/Neutral.png') },
    { label: "I'm Feeling Happy", color: '#685C05', faceColor: '#FDD835', img: require('../../assets/images/Happy.png') },
    { label: "I'm Feeling Overjoyed", color: '#2E5224', faceColor: '#81C784', img: require('../../assets/images/Overjoyed.png') },
];

export default function SetMoodScreen() {
    const [moodIndex, setMoodIndex] = useState(2);
    const currentMood = MOODS[moodIndex];

    // Bezier control points for the track
    const p0x = 20; const p0y = 40;
    const p1x = (width - 40) / 2; const p1y = 90;
    const p2x = width - 60; const p2y = 40;

    return (
        <View style={[styles.container, { backgroundColor: currentMood.color }]}>
            <View style={styles.header}>
                <Text style={styles.greeting}>👋 Hey Shinomiya!</Text>
                <Text style={styles.question}>How are you feeling{'\n'}this day?</Text>
            </View>

            <View style={styles.faceContainer}>
                {/* Big Smiley Face */}
                <View style={[styles.face, { backgroundColor: 'transparent' }]}>
                    <Image source={currentMood.img} style={{ width: 180, height: 180, resizeMode: 'contain' }} />
                </View>
            </View>

            <Text style={styles.moodLabel}>{currentMood.label}</Text>

            <View style={styles.sliderContainer}>
                {/* Custom SVG Track */}
                <Svg height="100" width={width - 40} style={{ position: 'absolute', top: 0 }}>
                    {/* Solid Curve Line (White) */}
                    <Path
                        d={`M${p0x},${p0y} Q${p1x},${p1y} ${p2x},${p2y}`}
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Dots on track */}
                    {[0, 1, 2, 3, 4].map(i => {
                        // Calculate position along Quadratic Bezier
                        const t = i / 4;
                        const xPos = Math.pow(1 - t, 2) * p0x + 2 * (1 - t) * t * p1x + Math.pow(t, 2) * p2x;
                        const yPos = Math.pow(1 - t, 2) * p0y + 2 * (1 - t) * t * p1y + Math.pow(t, 2) * p2y;

                        const isSelected = i === moodIndex;

                        return (
                            <React.Fragment key={i}>
                                {/* 1. Masking Ring (Background Color) -> Cuts the line */}
                                <Circle
                                    cx={xPos}
                                    cy={yPos}
                                    r={isSelected ? "18" : "14"}
                                    fill={currentMood.color}
                                />
                                {/* 2. Main White Circle */}
                                <Circle
                                    cx={xPos}
                                    cy={yPos}
                                    r={isSelected ? "14" : "10"}
                                    fill="#FFF"
                                />
                                {/* 3. Inner Dot (Bullseye) */}
                                <Circle
                                    cx={xPos}
                                    cy={yPos}
                                    r={isSelected ? "0" : "4"}
                                    fill={currentMood.color}
                                />
                            </React.Fragment>
                        );
                    })}
                </Svg>

                <Slider
                    style={{ width: width - 40, height: 100 }}
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    value={moodIndex}
                    onValueChange={setMoodIndex}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbTintColor="transparent"
                />
            </View>

            <TouchableOpacity style={styles.setBtn} onPress={() => router.push('/chat/new')}>
                <Text style={styles.btnText}>Set Mood</Text>
                <Ionicons name="checkmark" size={20} color="#1F1410" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    greeting: {
        color: '#FFF', fontSize: 16, marginBottom: 8, fontWeight: 'bold'
    },
    question: {
        color: '#FFF', fontSize: 28, fontWeight: 'bold', textAlign: 'center', fontFamily: Typography.heading,
    },
    faceContainer: {
        marginBottom: 40,
        alignItems: 'center', justifyContent: 'center'
    },
    face: {
        width: 180, height: 180, borderRadius: 90, alignItems: 'center', justifyContent: 'center',
        shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }
    },
    moodLabel: {
        color: '#FFF', fontSize: 22, marginBottom: 40, fontWeight: 'bold'
    },
    sliderContainer: {
        width: width - 40, height: 100, justifyContent: 'center', alignItems: 'center'
    },
    setBtn: {
        position: 'absolute', bottom: 50,
        backgroundColor: '#FFF',
        flexDirection: 'row', alignItems: 'center', gap: 8,
        paddingHorizontal: 48, paddingVertical: 16, borderRadius: 30,
    },
    btnText: {
        color: '#1F1410', fontSize: 16, fontWeight: 'bold'
    },
    // Face Features
    eyesRow: {
        flexDirection: 'row', gap: 35, alignItems: 'center'
    },
    dotEye: {
        width: 16, height: 26, borderRadius: 8,
    },
    arcEye: {
        width: 20, height: 20, borderTopWidth: 4, borderTopColor: '#1F1410', borderRadius: 10,
    },
    mouthContainer: {
        height: 20, justifyContent: 'center'
    },
    mouthLine: {
        width: 50, height: 6, borderRadius: 3,
    },
    mouthArc: {
        width: 60, height: 30, borderRadius: 30, borderColor: '#1F1410',
    }
});
