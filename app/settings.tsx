import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingItem = ({ icon, label, rightElement, isDanger, onPress }: any) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.itemLeft}>
            <Ionicons name={icon} size={20} color={isDanger ? '#D84315' : '#AAA'} />
            <Text style={[styles.itemLabel, isDanger && { color: '#D84315' }]}>{label}</Text>
        </View>
        {rightElement ? rightElement : <Ionicons name="chevron-forward" size={16} color="#44352D" />}
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                    <Ionicons name="chevron-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* User Mini Profile */}
                <View style={styles.userRow}>
                    <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>Shinomiya Kaguya</Text>
                        <Text style={styles.email}>elementary221b@gmail.com</Text>
                        <Text style={styles.loc}>Tokyo, Japan</Text>
                    </View>

                    {/* Floating Buttons next to head */}
                    <View style={{ position: 'absolute', flexDirection: 'row', top: 0, width: '100%', justifyContent: 'space-between', paddingHorizontal: 40, marginTop: -20, pointerEvents: 'none' }}>
                        {/* Decorative icons from image */}
                        <View style={[styles.floatIcon, { backgroundColor: '#8CAD65' }]}><Ionicons name="happy-outline" size={20} color="#FFF" /></View>
                        <View style={[styles.floatIcon, { backgroundColor: '#FF8A65' }]}><Ionicons name="pencil" size={20} color="#FFF" /></View>
                    </View>
                </View>

                {/* Section: General Settings */}
                <Text style={styles.sectionTitle}>General Settings</Text>

                <View style={styles.sectionGroup}>
                    <SettingItem icon="notifications-outline" label="Notifications" />
                    <SettingItem icon="person-outline" label="Personal Information" />
                    <SettingItem icon="alert-circle-outline" label="Emergency Contact" rightElement={<Text style={styles.metaText}>15+</Text>} />
                    <SettingItem icon="language-outline" label="Language" rightElement={<Text style={styles.metaText}>English (EN)</Text>} />
                    <SettingItem
                        icon="moon-outline"
                        label="Dark Mode"
                        rightElement={<Switch trackColor={{ false: "#767577", true: "#8CAD65" }} thumbColor={"#f4f3f4"} onValueChange={() => setDarkMode(!darkMode)} value={darkMode} />}
                    />
                    <SettingItem icon="share-social-outline" label="Invite Friends" />
                    <SettingItem icon="chatbox-ellipses-outline" label="Submit Feedback" />
                </View>

                {/* Section: Security */}
                <Text style={styles.sectionTitle}>Security & Privacy</Text>
                <View style={styles.sectionGroup}>
                    <SettingItem icon="shield-checkmark-outline" label="Security" />
                    <SettingItem icon="help-circle-outline" label="Help Center" />
                </View>

                {/* Section: Danger */}
                <Text style={styles.sectionTitle}>Danger Zone</Text>
                <TouchableOpacity style={[styles.sectionGroup, { backgroundColor: '#D84315' }]}>
                    <SettingItem icon="trash-outline" label="Close Account" isDanger onPress={() => { }} rightElement={<Ionicons name="chevron-forward" size={16} color="#FFF" />} />
                </TouchableOpacity>

                {/* Log Out */}
                <Text style={styles.sectionTitle}>Log Out</Text>
                <View style={styles.sectionGroup}>
                    <SettingItem icon="log-out-outline" label="Log Out" />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1610',
    },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.l, paddingTop: 60, marginBottom: 20,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    scrollContent: { paddingHorizontal: Spacing.l, paddingBottom: 100 },
    userRow: {
        alignItems: 'center', marginBottom: 30, position: 'relative', marginTop: 30,
    },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#1F1610', zIndex: 10 },
    name: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginTop: 12 },
    email: { fontSize: 12, color: '#AAA', marginTop: 4 },
    loc: { fontSize: 12, color: '#8D6E63', marginTop: 2, fontWeight: 'bold' },

    floatIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },

    sectionTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 12, marginTop: 12, fontSize: 14 },
    sectionGroup: {
        backgroundColor: '#2C211B', borderRadius: 20, overflow: 'hidden',
    },
    itemContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16,
        borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    itemLabel: { color: '#FFF', fontSize: 14, fontWeight: '500' },
    metaText: { color: '#AAA', fontSize: 12, marginRight: 8 },
});
