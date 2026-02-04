import { Image } from 'expo-image';
import { useCallback, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  type ListRenderItem,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const SPACING = 12;

// Nature images (Unsplash – free to use)
const GALLERY_IMAGES: { uri: string }[] = [
  { uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
  { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400' },
  { uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
  { uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400' },
  { uri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400' },
  { uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400' },
  { uri: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400' },
  { uri: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400' },
  { uri: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400' },
  { uri: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400' },
  { uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=400' },
];

function getColumns(width: number): number {
  if (width < 375) return 2;
  if (width <= 768) return 3;
  return 4;
}

export default function GalleryScreen() {
  const { width } = useWindowDimensions();
  const columns = useMemo(() => getColumns(width), [width]);
  const itemWidth = useMemo(
    () => (width - SPACING * (columns + 1)) / columns,
    [width, columns]
  );

  const renderItem: ListRenderItem<number> = useCallback(
    ({ item }) => (
      <View style={[styles.itemWrapper, { width: itemWidth, marginHorizontal: SPACING / 2 }]}>
        <Image
          source={GALLERY_IMAGES[item % GALLERY_IMAGES.length]}
          style={[styles.image, { width: itemWidth, aspectRatio: 1 }]}
          contentFit="cover"
        />
      </View>
    ),
    [itemWidth]
  );

  const data = useMemo(() => GALLERY_IMAGES.map((_, i) => i), []);

  const keyExtractor = useCallback((item: number) => String(item), []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Gallery</ThemedText>
        <ThemedText type="subtitle">Exercise 2: Responsive grid ({columns} columns)</ThemedText>
      </ThemedView>
      <FlatList
        data={data}
        key={columns}
        numColumns={columns}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { paddingHorizontal: SPACING }]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  listContent: {
    paddingHorizontal: SPACING / 2,
    paddingBottom: 32,
  },
  itemWrapper: {
    aspectRatio: 1,
  },
  image: {
    borderRadius: 8,
  },
});
