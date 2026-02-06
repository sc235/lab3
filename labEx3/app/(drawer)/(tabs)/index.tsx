import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WeatherCard } from '@/components/weather-card';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Lab 3</ThemedText>
        <ThemedText type="subtitle">Exercise 1: Weather Card</ThemedText>
      </ThemedView>
      <WeatherCard
        cityName="San Francisco"
        temperature={72}
        condition="Sunny"
        conditionIcon="☀️"
        high={78}
        low={65}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingBottom: 32 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
});
