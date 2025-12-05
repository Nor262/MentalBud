import { Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const chats = [
    { id: '1', title: 'Recent Breakup, felt s...', emotion: 'Sad', count: 478, date: '2m' },
    { id: '2', title: 'Shitty Teacher at Uni...', emotion: 'Happy', count: 478, date: '1d' }, // Ironically happy?
    { id: '3', title: 'Just wanna stop exist...', emotion: 'Overjoyed', count: 478, date: '3d' }, // Placeholder emotions from design
    { id: '4', title: 'More Xans this Xmas...', emotion: 'Sad', count: 478, date: '1w' },
];

export default function ChatHistoryScreen() {
    return (
        <View style={styles.container}>
            {/* Orange Header Card */}
            <View style={styles.orangeHeader}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
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
                {/* Create New FAB in middle */}
                <TouchableOpacity style={styles.fab} onPress={() => router.push('/chat/new')}>
                    <Ionicons name="add" size={32} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.listHeader}>
                    <Text style={styles.sectionTitle}>Recent (4)</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="filter" size={14} color="#FFF" />
                        <Text style={styles.filterText}>Newest</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={chats}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ gap: Spacing.m, paddingTop: 30 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chatCard} onPress={() => router.push(`/chat/${item.id}`)}>
                            <View style={[styles.avatarCircle, { backgroundColor: '#3D342B' }]}>
                                <Ionicons name="person" size={20} color="#8CAD65" />
                            </View>
                            <View style={styles.chatInfo}>
                                <Text style={styles.chatTitle}>{item.title}</Text>
                                <View style={styles.chatMeta}>
                                    <Ionicons name="chatbubble" size={12} color="#8B7D76" />
                                    <Text style={styles.metaText}>{item.count} Total</Text>
                                    <View style={styles.emotionBadge}>
                                        <Ionicons name={item.emotion === 'Sad' ? 'sad' : 'happy'} size={12} color="#FF8C60" />
                                        <Text style={styles.emotionText}>{item.emotion}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
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
        height: 220,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.l,
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
    bigTitle: {
        fontSize: 28,
        fontFamily: Typography.heading,
        color: '#FFF',
        marginBottom: Spacing.m,
    },
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.m,
    },
    statTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        color: '#FFF',
        fontWeight: '600',
    },
    fab: {
        position: 'absolute',
        bottom: -28, // Half height
        alignSelf: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF', // White contrast
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        zIndex: 10,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.l,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50, // Clearance for FAB
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
        borderRadius: 15,
        gap: 4,
        borderWidth: 1,
        borderColor: '#44352D',
    },
    filterText: {
        color: '#FFF',
        fontSize: 12,
    },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C211B',
        padding: Spacing.m,
        borderRadius: Layout.radius.xl,
    },
    avatarCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.m,
    },
    chatInfo: {
        flex: 1,
    },
    chatTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 15,
    },
    chatMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaText: {
        color: '#8B7D76',
        fontSize: 12,
    },
    emotionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    emotionText: {
        color: '#8B7D76',
        fontSize: 12,
    }
});
