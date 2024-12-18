import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useProgressContext } from '../progressContext';

const courses = [
  { id: '1', title: 'React Native Basics', description: 'Learn the fundamentals of React Native.' },
  { id: '2', title: 'Advanced JavaScript', description: 'Master advanced concepts in JavaScript.' },
  { id: '3', title: 'AI for Beginners', description: 'Explore the basics of Artificial Intelligence.' },
  { id: '4', title: 'Firebase Integration', description: 'Connect your app to Firebase for backend services.' },
];

export default function HomeScreen() {
  const { progress } = useProgressContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Education App</Text>
      <Text style={styles.subtitle}>Your Current Progress: {progress}%</Text>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseDescription}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 20, textAlign: 'center', color: '#555' },
  card: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  courseTitle: { fontSize: 20, fontWeight: 'bold' },
  courseDescription: { fontSize: 14, color: '#666', marginTop: 5 },
});
