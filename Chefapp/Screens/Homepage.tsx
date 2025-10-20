import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FreshCafe</Text>
      <Text style={styles.subtitle}>Select dishes or manage your menu below</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, padding: 10, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#222" },
  subtitle: { fontSize: 16, color: "#555" },
});
