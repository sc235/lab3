import { Image } from 'expo-image';
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  type ListRenderItem,
  TouchableOpacity,
  Modal,
  Pressable,
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePress = useCallback((imageUri: string) => {
    setSelectedImage(imageUri);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const renderItem: ListRenderItem<number> = useCallback(
    ({ item }) => {
      const imageSource = GALLERY_IMAGES[item % GALLERY_IMAGES.length];
      return (
        <View style={[styles.itemWrapper, { width: itemWidth, marginHorizontal: SPACING / 2 }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleImagePress(imageSource.uri)}
          >
            <Image
              source={imageSource}
              style={[styles.image, { width: itemWidth, aspectRatio: 1 }]}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>
      );
    },
    [itemWidth, handleImagePress]
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

      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalBackdrop} onPress={handleCloseModal}>
            <View style={styles.modalContent}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.zoomedImage}
                  contentFit="contain"
                />
              )}
            </View>
          </Pressable>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
