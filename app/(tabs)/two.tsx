import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProgressContext } from "../progressContext"

export default function ProgressScreen() {
  const { progress, updateProgress } = useProgressContext();

  // Load progress from AsyncStorage on app load
  // useEffect(() => {
  //   const loadProgress = async () => {
  //     try {
  //       const savedProgress = await AsyncStorage.getItem('progress');
  //       if (savedProgress) {
  //         setProgress(Number(savedProgress));
  //       }
  //     } catch (error) {
  //       console.error('Failed to load progress:', error);
  //     }
  //   };
  //   loadProgress();
  // }, []);

  // Save progress to AsyncStorage
  // const saveProgress = async (newProgress: number) => {
  //   try {
  //     await AsyncStorage.setItem('progress', newProgress.toString());
  //     setProgress(newProgress);
  //   } catch (error) {
  //     console.error('Failed to save progress:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.progress}>Progress: {progress}%</Text>
      <Button
        title="Increase Progress"
        onPress={() => updateProgress(progress + 10 > 100 ? 100 : progress + 10)}
      />
      <Button
        title="Reset Progress"
        color="red"
        onPress={() => updateProgress(0)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  progress: { fontSize: 20, marginVertical: 10 },
});
