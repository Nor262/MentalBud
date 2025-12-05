import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Create a custom theme that enforces the app's background color
  // This prevents the white background from showing during transitions
  const CustomTheme = {
    ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: '#1F1410', // Enforce deep coffee background
    },
  };

  return (
    <ThemeProvider value={CustomTheme}>
      <Stack screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        contentStyle: { backgroundColor: '#1F1410' },
        // Fix for blank screen on goBack
        // @ts-ignore
        detachPreviousScreen: false,
        freezeOnBlur: true,
        fullScreenGestureEnabled: true,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
