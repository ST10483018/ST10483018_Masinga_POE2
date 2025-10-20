import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type Course = "all" | "starters" | "mains" | "desserts";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  course: "starters" | "mains" | "desserts";
}

interface MenuProps {
  menu: MenuItem[];
  goBack: () => void;
}

export default function Home({ menu, goBack }: MenuProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course>("all");
  const [loading] = useState(false);

  const filteredItems =
    selectedCourse === "all"
      ? menu
      : menu.filter((item) => item.course === selectedCourse);

  const groupedItems = filteredItems.reduce(
    (acc: Record<string, MenuItem[]>, item) => {
      if (!acc[item.course]) acc[item.course] = [];
      acc[item.course].push(item);
      return acc;
    },
    {}
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Christoffel’s Dining Menu</Text>
        <Text style={styles.subtitle}>Total Dishes: {filteredItems.length}</Text>

        {/* Filter */}
        <Text style={styles.label}>Filter by Course</Text>
        <View style={styles.courseRow}>
          {(["all", "starters", "mains", "desserts"] as Course[]).map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.courseButton,
                selectedCourse === c && styles.courseButtonActive,
              ]}
              onPress={() => setSelectedCourse(c)}
            >
              <Text
                style={
                  selectedCourse === c
                    ? styles.courseTextActive
                    : styles.courseText
                }
              >
                {c.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : filteredItems.length === 0 ? (
          <Text style={styles.emptyText}>No items available.</Text>
        ) : (
          <View style={styles.menuContainer}>
            {Object.keys(groupedItems).map((course) => (
              <View key={course} style={styles.section}>
                <Text style={styles.sectionTitle}>{course.toUpperCase()}</Text>
                {groupedItems[course].map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>R {item.price}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d8ddddff" },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
  },
  label: {
    fontWeight: "400",
    color: "#111111ff",
    marginBottom: 8,
    fontSize: 14,
  },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  courseButton: {
    borderWidth: 1,
    borderColor: "#cccccc3d",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  courseButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  courseText: { color: "#333" },
  courseTextActive: { color: "#fff", fontWeight: "600" },
  menuContainer: { marginTop: 10 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  itemCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemName: { fontSize: 16, fontWeight: "500" },
  itemPrice: { color: "#666", marginTop: 4 },
  itemDescription: { color: "#444", marginTop: 6, fontSize: 13 },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  backText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
});
