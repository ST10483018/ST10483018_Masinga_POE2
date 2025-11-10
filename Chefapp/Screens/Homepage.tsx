import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, Dish } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home"> & {
  menu: Dish[];
  setMenu: React.Dispatch<React.SetStateAction<Dish[]>>;
};

export default function Homepage({ navigation, menu, setMenu }: Props) {
  const totalDishes = menu.length;
  const totalValue = useMemo(() => menu.reduce((s, m) => s + (m.price || 0), 0), [menu]);
  const avgAll = totalDishes ? totalValue / totalDishes : 0;

  const avgPerCourse = useMemo(() => {
    const result: Record<Dish["course"], number> = { starters: 0, mains: 0, desserts: 0 };
    const counts: Record<Dish["course"], number> = { starters: 0, mains: 0, desserts: 0 };
    menu.forEach((m) => {
      result[m.course] += m.price;
      counts[m.course] += 1;
    });
    (Object.keys(result) as Dish["course"][]).forEach((c) => {
      result[c] = counts[c] ? result[c] / counts[c] : 0;
    });
    return result;
  }, [menu]);

  const handleDelete = (id: string) => {
    setMenu((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Chef Menu</Text>

      <View style={styles.summary}>
        <Text>Total dishes: {totalDishes}</Text>
        <Text>Total value: {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(totalValue)}</Text>
        <Text>Average (all): {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(avgAll)}</Text>
        <Text>Avg Starters: R{avgPerCourse.starters.toFixed(2)}</Text>
        <Text>Avg Mains: R{avgPerCourse.mains.toFixed(2)}</Text>
        <Text>Avg Desserts: R{avgPerCourse.desserts.toFixed(2)}</Text>
      </View>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>{new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(item.price)}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.removeBtn}>
                <Text style={{ color: "#fff" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No dishes yet.</Text>}
        contentContainerStyle={{ padding: 12 }}
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.primary} onPress={() => navigation.navigate("AddEditDish")}>
          <Text style={styles.primaryText}>Manage Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate("FilterMenu")}>
          <Text style={styles.secondaryText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f5f6" },
  title: { fontSize: 22, fontWeight: "700", padding: 12 },
  summary: { backgroundColor: "#fff", margin: 12, padding: 12, borderRadius: 8 },
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 12, marginBottom: 10, borderRadius: 8, alignItems: "center" },
  name: { fontSize: 16, fontWeight: "600" },
  desc: { color: "#444", marginTop: 4 },
  price: { fontWeight: "700" },
  removeBtn: { marginTop: 8, backgroundColor: "#dc3545", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  empty: { textAlign: "center", marginTop: 40, color: "#888" },
  buttons: { flexDirection: "row", justifyContent: "space-between", padding: 12 },
  primary: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, flex: 0.65, alignItems: "center" },
  primaryText: { color: "#fff", fontWeight: "700" },
  secondary: { backgroundColor: "#fff", padding: 12, borderRadius: 8, flex: 0.32, alignItems: "center", borderWidth: 1, borderColor: "#ddd" },
  secondaryText: { color: "#007AFF", fontWeight: "700" },
});
