import { Colors, Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'reminder' | 'alert' | 'info';
    read: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Time to Meditate',
        message: 'Take a break and clear your mind for 10 minutes.',
        time: '10:00 AM',
        type: 'reminder',
        read: false,
    },
    {
        id: '2',
        title: 'New Article Available',
        message: 'Check out "Methods for Better Sleep" in the Explore tab.',
        time: 'Yesterday',
        type: 'info',
        read: true,
    },
    {
        id: '3',
        title: 'Weekly Report',
        message: 'Your mood analysis for last week is ready.',
        time: 'Monday',
        type: 'info',
        read: true,
    },
];

export default function NotificationsScreen() {
    const renderItem = ({ item }: { item: Notification }) => {
        return (
            <TouchableOpacity style={[styles.item, !item.read && styles.unreadItem]}>
                <View style={[styles.iconContainer, { backgroundColor: item.read ? Colors.dark.surfaceHighlight : 'rgba(139, 92, 246, 0.2)' }]}>
                    <Ionicons
                        name={item.type === 'reminder' ? 'alarm' : 'information-circle'}
                        size={24}
                        color={item.read ? Colors.dark.textSecondary : Colors.dark.primary}
                    />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.itemHeader}>
                        <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                </View>
                {!item.read && <View style={styles.dot} />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color={Colors.dark.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Smart Notifications</Text>
                <View style={{ width: 40 }} />
            </View>
            <FlatList
                data={mockNotifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    header: {
        paddingTop: Spacing.xl * 1.5,
        paddingBottom: Spacing.m,
        paddingHorizontal: Spacing.l,
        backgroundColor: Colors.dark.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backBtn: {
        width: 40, alignItems: 'flex-start', justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.dark.text,
        fontFamily: Typography.heading,
    },
    listContent: {
        padding: Spacing.m,
        paddingBottom: 100,
    },
    item: {
        flexDirection: 'row',
        padding: Spacing.m,
        backgroundColor: Colors.dark.surface,
        marginBottom: Spacing.s,
        borderRadius: Layout.radius.m,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    unreadItem: {
        borderColor: 'rgba(139, 92, 246, 0.3)',
        backgroundColor: 'rgba(40, 41, 61, 0.8)',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.m,
    },
    textContainer: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.text,
    },
    unreadTitle: {
        color: Colors.dark.text,
        fontWeight: '700',
    },
    time: {
        fontSize: 12,
        color: Colors.dark.textSecondary,
    },
    message: {
        fontSize: 14,
        color: Colors.dark.textSecondary,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.dark.accent,
        marginLeft: Spacing.s,
    },
});
