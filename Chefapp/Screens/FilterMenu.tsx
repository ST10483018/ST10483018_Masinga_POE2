import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, Dish } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "FilterMenu"> & {
  menu: Dish[];
};

export default function FilterMenu({ navigation, menu }: Props) {
  const [filter, setFilter] = useState<"all" | Dish["course"]>("all");
  const filtered = filter === "all" ? menu : menu.filter((m) => m.course === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <View style={styles.chips}>
        {(["all", "starters", "mains", "desserts"] as const).map((c) => (
          <TouchableOpacity key={c} style={[styles.chip, filter === c && styles.chipActive]} onPress={() => setFilter(c as any)}>
            <Text style={filter === c ? styles.chipTextActive : styles.chipText}>{c.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
            <Text style={styles.course}>{item.course.toUpperCase()}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 40 }}>No items</Text>}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f9f9f9" 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "700", 
    padding: 12 
  },
  chips: { 
    flexDirection: "row", 
    paddingHorizontal: 12 
  },
  chip: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 20, 
    marginRight: 8 
  },
  chipActive: { 
    backgroundColor: "#007AFF", 
    borderColor: "#007AFF" 
  },
  chipText: { 
    color: "#333" 
  },
  chipTextActive: { 
    color: "#fff", 
    fontWeight: "700" 
  },
  card: { 
    backgroundColor: "#fff", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  name: { 
    fontSize: 16, 
    fontWeight: "700" 
  },
  price: { 
    marginTop: 6, 
    fontWeight: "600" 
  },
  course: { 
    marginTop: 4, 
    color: "#666" 
  },
  back: { 
    alignItems: "center", 
    padding: 12 
  },
});
