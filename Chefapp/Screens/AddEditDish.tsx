import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, Dish } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "AddEditDish"> & {
  menu: Dish[];
  setMenu: React.Dispatch<React.SetStateAction<Dish[]>>;
};

export default function AddEditDish({ navigation, menu, setMenu }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState<Dish["course"]>("starters");

  const validAndSave = () => {
    if (!name.trim()) { Alert.alert("Validation", "Please enter a dish name"); return; }
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) { Alert.alert("Validation", "Please enter a valid price"); return; }

    const newItem: Dish = { id: String(Date.now()), name: name.trim(), description: description.trim(), price: Math.round(p * 100) / 100, course };
    setMenu((prev) => [newItem, ...prev]);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Dish</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Description (optional)" value={description} onChangeText={setDescription} style={[styles.input, { height: 80 }]} multiline />
      <TextInput placeholder="Price (e.g. 45.00)" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />

      <View style={styles.courseRow}>
        {(["starters", "mains", "desserts"] as Dish["course"][]).map((c) => {
          const active = course === c;
          return (
            <TouchableOpacity key={c} style={[styles.chip, active && styles.chipActive]} onPress={() => setCourse(c)}>
              <Text style={active ? styles.chipTextActive : styles.chipText}>{c.toUpperCase()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={validAndSave}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Save Dish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", minHeight: "100%" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 12 },
  courseRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  chip: { borderWidth: 1, borderColor: "#ccc", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, marginRight: 8 },
  chipActive: { backgroundColor: "#007AFF", borderColor: "#007AFF" },
  chipText: { color: "#333" },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  saveBtn: { backgroundColor: "#28a745", padding: 14, borderRadius: 8, alignItems: "center" },
});
