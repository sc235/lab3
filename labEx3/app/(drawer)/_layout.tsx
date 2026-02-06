import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useEffectiveTheme } from '@/contexts/theme-context';

export default function DrawerLayout() {
  const effectiveTheme = useEffectiveTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: Colors[effectiveTheme].tint,
          drawerInactiveTintColor: Colors[effectiveTheme].text,
          headerStyle: {
            backgroundColor: Colors[effectiveTheme].background,
          },
          headerTintColor: Colors[effectiveTheme].text,
          drawerStyle: {
            backgroundColor: Colors[effectiveTheme].background,
          },
        }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size} name="house.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerLabel: 'Settings',
            drawerIcon: ({ color, size }) => (
              <IconSymbol size={size} name="gearshape.fill" color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
