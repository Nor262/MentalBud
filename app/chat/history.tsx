import { Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const recentChats = [
    { id: '1', title: 'Recent Breakup, felt s...', emotion: 'Sad', count: 478, date: '2m', color: '#FF8C60', icon: 'heart-dislike' },
    { id: '2', title: 'Shitty Teacher at Uni...', emotion: 'Happy', count: 478, date: '1d', color: '#FBC02D', icon: 'school' },
    { id: '3', title: 'Just wanna stop exist...', emotion: 'Overjoyed', count: 478, date: '3d', color: '#8CAD65', icon: 'happy' },
];

const pastChats = [
    { id: '4', title: 'More Xans this Xmas...', emotion: 'Sad', count: 478, date: '1w', color: '#FF8C60', icon: 'medical' },
    { id: '5', title: 'Family Issues again...', emotion: 'Angry', count: 120, date: '2w', color: '#D84315', icon: 'people' },
];

export default function ChatHistoryScreen() {
    return (
        <View style={styles.container}>
            {/* Orange Header Card */}
            <View style={styles.orangeHeader}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Ionicons name="cellular-outline" size={24} color="#FFF" />
                </View>

                <Text style={styles.bigTitle}>My Conversations</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statTag}>
                        <Ionicons name="time-outline" size={16} color="#FFF" />
                        <Text style={styles.statText}>1571 Total</Text>
                    </View>
                    <View style={styles.statTag}>
                        <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FFF" />
                        <Text style={styles.statText}>32 Left this Month</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Recent Section */}
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionTitle}>Recent (4)</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="filter" size={12} color="#FFF" />
                        <Text style={styles.filterText}>Newest</Text>
                        <Ionicons name="chevron-down" size={12} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {recentChats.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.chatCard} onPress={() => router.push(`/chat/${item.id}`)}>
                        <View style={[styles.avatarCircle, { backgroundColor: '#3D342B' }]}>
                            {/* Icon inside a circle */}
                            <Ionicons name={item.icon as any} size={20} color="#8CAD65" />
                        </View>
                        <View style={styles.chatInfo}>
                            <Text style={styles.chatTitle}>{item.title}</Text>
                            <View style={styles.chatMeta}>
                                <Ionicons name="chatbubble" size={10} color="#8B7D76" />
                                <Text style={styles.metaText}>{item.count} Total</Text>
                                <View style={styles.emotionBadge}>
                                    <Ionicons name={item.emotion === 'Sad' ? 'sad' : 'happy'} size={10} color={item.color} />
                                    <Text style={[styles.emotionText, { color: item.color }]}>{item.emotion}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                {/* Past Section */}
                <View style={[styles.sectionRow, { marginTop: 30 }]}>
                    <Text style={styles.sectionTitle}>Past (16)</Text>
                    <TouchableOpacity>
                        <Ionicons name="settings-outline" size={16} color="#AAA" />
                    </TouchableOpacity>
                </View>

                {pastChats.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.chatCard} onPress={() => router.push(`/chat/${item.id}`)}>
                        <View style={[styles.avatarCircle, { backgroundColor: '#3D342B' }]}>
                            <Ionicons name={item.icon as any} size={20} color="#8CAD65" />
                        </View>
                        <View style={styles.chatInfo}>
                            <Text style={styles.chatTitle}>{item.title}</Text>
                            <View style={styles.chatMeta}>
                                <Ionicons name="chatbubble" size={10} color="#8B7D76" />
                                <Text style={styles.metaText}>{item.count} Total</Text>
                                <View style={styles.emotionBadge}>
                                    <Ionicons name={item.emotion === 'Sad' ? 'sad' : 'happy'} size={10} color={item.color} />
                                    <Text style={[styles.emotionText, { color: item.color }]}>{item.emotion}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}


                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1410',
    },
    orangeHeader: {
        backgroundColor: '#FF8C60', // Burnt Orange
        height: 250,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
        marginBottom: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    circleBtn: {
        width: 44, height: 44, borderRadius: 22,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center', justifyContent: 'center'
    },
    bigTitle: {
        fontSize: 32,
        fontFamily: Typography.heading,
        color: '#FFF',
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 20,
    },
    statTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.l,
    },
    sectionRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C211B',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1,
        borderColor: '#44352D',
    },
    filterText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold'
    },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C211B',
        padding: 16,
        borderRadius: 24,
        marginBottom: 12,
    },
    avatarCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    chatInfo: {
        flex: 1,
    },
    chatTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 6,
        fontSize: 15,
    },
    chatMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    metaText: {
        color: '#8B7D76',
        fontSize: 11,
    },
    emotionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    emotionText: {
        fontSize: 11,
        fontWeight: 'bold'
    }
});
