import { StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/contexts/theme-context';

export default function SettingsScreen() {
  const { theme, setTheme, effectiveTheme } = useThemeContext();

  const handleThemeToggle = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText type="subtitle">Customize your app experience</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Appearance
        </ThemedText>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText type="defaultSemiBold">Dark Mode</ThemedText>
            <ThemedText style={styles.settingDescription}>
              {theme === null
                ? `Following system (${effectiveTheme})`
                : effectiveTheme === 'dark'
                  ? 'Enabled'
                  : 'Disabled'}
            </ThemedText>
          </View>
          <Switch
            value={effectiveTheme === 'dark'}
            onValueChange={handleThemeToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={effectiveTheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
});
