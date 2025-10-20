import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet } from "react-native";
import Home from "./Screens/Homepage";

type Dish = {
  id: string;
  name: string;
  description: string;
  price: string;
};

export default function App() {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Prawn Gratin",
      description: "Prawns in a tarragon mustard cream sauce with herbs and charred ciabatta",
      price: "R198",
    },
    {
      id: "2",
      name: "Fillet Steak",
      description: "250g fillet medallions with roasted cherry tomatoes, crispy onions, fries, and jalapeño Dijon mustard sauce",
      price: "R322",
    },
    {
      id: "3",
      name: "Coffee Pavlova",
      description: "Coffee meringue, coffee cream, pecan florentine, maple coffee syrup, and cocoa powder",
      price: "R108",
    },
  ]);

  const [newDish, setNewDish] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const addDish = () => {
    if (!newDish || !newDesc || !newPrice) return;
    const dish: Dish = {
      id: Date.now().toString(),
      name: newDish,
      description: newDesc,
      price: newPrice,
    };
    setDishes([...dishes, dish]);
    setNewDish("");
    setNewDesc("");
    setNewPrice("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Home />
      <Text style={styles.title}>Menu Management</Text>

      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <Text style={styles.dishTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />

      <Text style={styles.addTitle}>Add New Dish</Text>
      <TextInput
        placeholder="Dish name"
        value={newDish}
        onChangeText={setNewDish}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={newDesc}
        onChangeText={setNewDesc}
        style={styles.input}
      />
      <TextInput
        placeholder="Price (e.g. R120)"
        value={newPrice}
        onChangeText={setNewPrice}
        style={styles.input}
      />
      <Button title="Add Dish" onPress={addDish} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  addTitle: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 5, borderRadius: 5 },
  dishCard: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  dishTitle: { fontWeight: "bold", fontSize: 16 },
  price: { color: "#444", marginTop: 4 },
});