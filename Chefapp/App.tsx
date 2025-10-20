import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Home from "./Screens/Homepage";

type Course = "starters" | "mains" | "desserts";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  course: Course;
};

const COURSES: Course[] = ["starters", "mains", "desserts"];

export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Tomato Soup",
      description: "A warm and hearty starter.",
      price: "45",
      course: "starters",
    },
    {
      id: "2",
      name: "Grilled Chicken",
      description: "Served with seasonal vegetables.",
      price: "120",
      course: "mains",
    },
    {
      id: "3",
      name: "Chocolate Mousse",
      description: "Rich and creamy dessert.",
      price: "60",
      course: "desserts",
    },
  ]);

  const [showMenuPage, setShowMenuPage] = useState(false);

  // Modal & form state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState<Course>("starters");

  // Open modal for adding new dish
  const openAdd = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setCourse("starters");
    setModalVisible(true);
  };

  // Open modal to edit existing dish
  const openEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCourse(item.course);
    setModalVisible(true);
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a dish name.");
      return false;
    }
    if (!price.trim() || isNaN(Number(price))) {
      Alert.alert("Validation", "Please enter a valid numeric price.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingId) {
      // update
      setMenu((prev) =>
        prev.map((it) =>
          it.id === editingId
            ? { ...it, name: name.trim(), description: description.trim(), price: price.trim(), course }
            : it
        )
      );
    } else {
      // add new
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        course,
      };
      setMenu((prev) => [newItem, ...prev]);
    }

    setModalVisible(false);
  };

  // Confirm and delete handler
  const confirmDelete = (id: string) => {
    Alert.alert("Delete Dish", "Are you sure you want to delete this dish?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setMenu((prev) => prev.filter((it) => it.id !== id));
          // if currently editing the deleted item, close modal
          if (editingId === id) {
            setModalVisible(false);
            setEditingId(null);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outer}>
        {showMenuPage ? (
          <Home menu={menu} goBack={() => setShowMenuPage(false)} />
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Christoffel’s Menu Manager</Text>
            {menu.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>R {item.price}</Text>
                </View>

                <View style={[styles.row, { marginTop: 8 }]}>
                  <Text style={styles.itemCourse}>{item.course.toUpperCase()}</Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => openEdit(item)}
                      activeOpacity={0.8}
                      style={styles.editButton}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => confirmDelete(item.id)}
                      activeOpacity={0.8}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            ))}

            <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={openAdd}>
              <Text style={styles.buttonText}>Add New Dish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.button, { backgroundColor: "#34C759", marginTop: 12 }]}
              onPress={() => setShowMenuPage(true)}
            >
              <Text style={styles.buttonText}>View Menu Page</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      {/* Modal Form */}
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{editingId ? "Edit Dish" : "Add Dish"}</Text>

            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { height: 80 }]}
              multiline
            />
            <TextInput
              placeholder="Price (numeric)"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={{ flexDirection: "row", marginTop: 8 }}>
              {COURSES.map((c) => {
                const active = c === course;
                return (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setCourse(c)}
                    style={[styles.courseBtn, active && styles.courseBtnActive]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.courseBtnText, active && styles.courseBtnTextActive]}>
                      {c.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <TouchableOpacity
                style={[styles.modalAction, { backgroundColor: "#e5e7eb" }]}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={{ color: "#111827", fontWeight: "700" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalAction, { backgroundColor: "#007AFF" }]}
                onPress={handleSave}
                activeOpacity={0.9}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  outer: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2937",
    marginVertical: 12,
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  itemCourse: {
    fontSize: 13,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  itemPrice: {
    fontSize: 15,
    color: "#0b74ff",
    fontWeight: "700",
  },
  itemDescription: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 8,
    lineHeight: 18,
  },
  button: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 18,
    alignItems: "center",
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
    }),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginRight: 8,
  },
  editButtonText: {
    color: "#111827",
    fontWeight: "700",
  },

  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  deleteButtonText: {
    color: "#dc2626",
    fontWeight: "700",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modal: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: "#fff",
  },
  courseBtn: {
    flex: 1,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  courseBtnActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  courseBtnText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 12,
  },
  courseBtnTextActive: {
    color: "#fff",
  },
  modalAction: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});
