import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type WeatherCardProps = {
  cityName?: string;
  temperature?: number;
  condition?: string;
  conditionIcon?: string | number; // emoji string or require() for image
  high?: number;
  low?: number;
};

export function WeatherCard({
  cityName = 'San Francisco',
  temperature = 72,
  condition = 'Sunny',
  conditionIcon = '☀️',
  high = 78,
  low = 65,
}: WeatherCardProps) {
  const isImageSource = typeof conditionIcon !== 'string';
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{cityName}</Text>
      <Text style={styles.temp}>{temperature}°</Text>
      <View style={styles.conditionRow}>
        {isImageSource ? (
          <Image source={conditionIcon as number} style={styles.icon} />
        ) : (
          <Text style={styles.emojiIcon}>{conditionIcon}</Text>
        )}
        <Text style={styles.description}>{condition}</Text>
      </View>
      <View style={styles.highLowRow}>
        <Text style={styles.high}>H: {high}°</Text>
        <Text style={styles.low}>L: {low}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
  },
  temp: {
    fontSize: 72,
    fontWeight: '200',
    color: '#0D47A1',
    marginVertical: 8,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  emojiIcon: {
    fontSize: 36,
  },
  icon: {
    width: 48,
    height: 48,
  },
  description: {
    fontSize: 18,
    color: '#424242',
    fontWeight: '500',
  },
  highLowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 101, 192, 0.2)',
  },
  high: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C62828',
  },
  low: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1565C0',
  },
});
