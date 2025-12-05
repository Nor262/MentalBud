import { Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Mood States
const MOODS = [
    { label: "I'm Feeling Depressed", color: '#311B92', icon: 'sad', faceColor: '#9575CD' }, // 0
    { label: "I'm Feeling Sad", color: '#BF360C', icon: 'sad', faceColor: '#FF7043' }, // 1
    { label: "I'm Feeling Neutral", color: '#3E2723', icon: 'remove', faceColor: '#8D6E63' }, // 2
    { label: "I'm Feeling Happy", color: '#443509', icon: 'happy', faceColor: '#FDD835' }, // 3
    { label: "I'm Feeling Overjoyed", color: '#1B5E20', icon: 'happy', faceColor: '#81C784' }, // 4
];

export default function SetMoodScreen() {
    const [moodIndex, setMoodIndex] = useState(2);
    const currentMood = MOODS[moodIndex];

    return (
        <View style={[styles.container, { backgroundColor: currentMood.color }]}>
            <View style={styles.header}>
                <Text style={styles.greeting}>👋 Hey Shinomiya!</Text>
                <Text style={styles.question}>How are you feeling{'\n'}this day?</Text>
            </View>

            <View style={styles.faceContainer}>
                {/* Big Smiley Face */}
                <View style={[styles.face, { backgroundColor: currentMood.faceColor }]}>
                    <Ionicons name={currentMood.icon as any} size={120} color="#1F1410" />
                </View>
            </View>

            <Text style={styles.moodLabel}>{currentMood.label}</Text>

            <View style={styles.sliderContainer}>
                {/* Custom SVG Track approximation */}
                <Svg height="60" width={width - 40} style={{ position: 'absolute', top: 10 }}>
                    <Path d={`M20,30 Q${(width - 40) / 2},60 ${width - 60},20`} stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                    {/* Dots on track */}
                    {[0, 1, 2, 3, 4].map(i => (
                        <Circle
                            key={i}
                            cx={20 + i * ((width - 80) / 4)}
                            cy={i === 0 || i === 4 ? 30 : i === 1 || i === 3 ? 45 : 55}
                            r="8"
                            fill={i === moodIndex ? '#FFF' : 'rgba(255,255,255,0.3)'}
                        />
                    ))}
                </Svg>

                <Slider
                    style={{ width: width - 40, height: 80 }}
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    value={moodIndex}
                    onValueChange={setMoodIndex}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbTintColor="transparent" // Hiding default thumb to use custom visual above
                />
            </View>

            <TouchableOpacity style={styles.setBtn} onPress={() => router.back()}>
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
        transition: 'background-color 0.3s ease',
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
        width: 200, height: 200, borderRadius: 100, alignItems: 'center', justifyContent: 'center',
    },
    moodLabel: {
        color: '#FFF', fontSize: 20, marginBottom: 40, fontWeight: 'bold'
    },
    sliderContainer: {
        width: width - 40, height: 100, justifyContent: 'center', alignItems: 'center'
    },
    setBtn: {
        position: 'absolute', bottom: 40,
        backgroundColor: '#FFF',
        flexDirection: 'row', alignItems: 'center', gap: 8,
        paddingHorizontal: 32, paddingVertical: 16, borderRadius: 30,
    }
    ,
    btnText: {
        color: '#1F1410', fontSize: 16, fontWeight: 'bold'
    }
});
