import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_HEIGHT = 80;
const TAB_WIDTH = width - 40; // Floating dock width

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.dockContainer}>
      {/* Background Shape */}
      <View style={styles.svgBackground}>
        <Svg width={TAB_WIDTH} height={TAB_HEIGHT} viewBox={`0 0 ${TAB_WIDTH} ${TAB_HEIGHT}`}>
          <Path
            d={`
              M 0,30 
              Q 0,0 30,0
              L ${TAB_WIDTH / 2 - 50},0
              Q ${TAB_WIDTH / 2 - 35},0 ${TAB_WIDTH / 2 - 25},25
              Q ${TAB_WIDTH / 2},50 ${TAB_WIDTH / 2 + 25},25 
              Q ${TAB_WIDTH / 2 + 35},0 ${TAB_WIDTH / 2 + 50},0
              L ${TAB_WIDTH - 30},0
              Q ${TAB_WIDTH},0 ${TAB_WIDTH},30
              L ${TAB_WIDTH},${TAB_HEIGHT - 30}
              Q ${TAB_WIDTH},${TAB_HEIGHT} ${TAB_WIDTH - 30},${TAB_HEIGHT}
              L 30,${TAB_HEIGHT}
              Q 0,${TAB_HEIGHT} 0,${TAB_HEIGHT - 30}
              Z
            `}
            fill="#4B3425" // Dock Color
          />
        </Svg>
      </View>

      {/* FAB - Absolute Center (Visually in the dip) */}
      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity onPress={() => router.push('/chat/new')} style={styles.fab}>
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.fabGlow} />
      </View>

      {/* Tab Items Container */}
      <View style={styles.itemsContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const color = isFocused ? '#FFF' : '#8B7D76';

          // If it's the 'add' route, render a transparent spacer to keeping spacing even
          if (route.name === 'add') {
            return <View key={index} style={styles.spacer} />;
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              {isFocused ? (
                // Active State: Large Dark Circle "Cutout" logic
                <View style={styles.activeIconWrapper}>
                  {options.tabBarIcon && options.tabBarIcon({ color })}
                </View>
              ) : (
                // Inactive State: Normal Icon
                <View style={styles.iconWrapper}>
                  {options.tabBarIcon && options.tabBarIcon({ color })}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Completely hide default bar
        freezeOnBlur: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
      // @ts-ignore
      sceneContainerStyle={{ backgroundColor: '#1F1410' }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={color === '#FFF' ? "home" : "home-outline"} size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="chatbot" // Chat History
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={color === '#FFF' ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} size={24} color={color} />
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/chat/history');
          },
        })}
      />
      {/* Central Add Button Route (Dummy, replaced by FAB) */}
      <Tabs.Screen
        name="add"
        options={{ tabBarButton: () => null }}
        listeners={() => ({
          tabPress: (e) => { e.preventDefault(); router.push('/chat/new'); },
        })}
      />
      {/* Chart / Stats Route */}
      <Tabs.Screen
        name="stress_tab"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={color === '#FFF' ? "stats-chart" : "stats-chart-outline"} size={24} color={color} />
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/stress');
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={color === '#FFF' ? "person" : "person-outline"} size={24} color={color} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  dockContainer: {
    position: 'absolute',
    bottom: 30, // Distance from bottom edge
    left: 20,
    right: 20,
    height: TAB_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: 'transparent'
  },
  svgBackground: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute items
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1, // Equal width
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  spacer: {
    flex: 1, // Matches tabItem flex to keep spacing symmetric
  },

  // Icon Styles
  iconWrapper: {
    width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 22,
  },
  activeIconWrapper: {
    width: 60, height: 60,
    borderRadius: 30,
    backgroundColor: '#1F1610', // Dark Circle Background
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#4B3425', // Optional: Match dock color for a stroke effect
  },

  // FAB Styles
  fabContainer: {
    position: 'absolute',
    top: -30, // Push up into the curve
    left: '50%',
    marginLeft: -35, // Center the 70px container
    width: 70, height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  fab: {
    width: 60, height: 60,
    borderRadius: 30,
    backgroundColor: '#8CAD65', // Sage Green
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    shadowColor: "#8CAD65", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 10,
  },
  fabGlow: {
    position: 'absolute',
    width: 60, height: 60,
    borderRadius: 30,
    backgroundColor: '#8CAD65',
    opacity: 0.3,
    transform: [{ scale: 1.2 }],
    zIndex: 10,
  }
});
