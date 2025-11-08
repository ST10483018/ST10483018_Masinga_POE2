import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import { MenuContext, MenuItem, Course } from "../MenuContext";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteParams = {
  itemId?: string;
};

export default function AddEditDish() {
  const { menu, setMenu } = useContext(MenuContext);
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params || {}) as RouteParams;
  const editingItem = menu.find(m => m.id === params.itemId);

  const [name, setName] = useState(editingItem ? editingItem.name : "");
  const [description, setDescription] = useState(editingItem ? editingItem.description || "" : "");
  const [price, setPrice] = useState(editingItem ? String(editingItem.price) : "");
  const [course, setCourse] = useState<Course | "">((editingItem ? editingItem.course : "") as Course | "");

  useEffect(() => {
  }, []);

  function validateAndSave() {
    if (!name.trim()) { Alert.alert("Validation", "Please enter a dish name"); return; }
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) { Alert.alert("Validation", "Please enter a valid price"); return; }
    if (!course) { Alert.alert("Validation", "Please select a course"); return; }

    const newItem: MenuItem = {
      id: editingItem ? editingItem.id : String(Date.now()),
      name: name.trim(),
      description: description.trim(),
      price: Math.round(p * 100) / 100,
      course: course as Course,
    };
    if (editingItem) {
      setMenu(menu.map(m => m.id === editingItem.id ? newItem : m));
    } else {
      setMenu([newItem, ...menu]);
    }
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{editingItem ? "Edit Dish" : "Add Dish"}</Text>
      <Text style={styles.subtitle}>Total Dishes: {menu.length}</Text>
      <TextInput style={styles.input} placeholder="Dish name" value={name} onChangeText={setName} />
      <TextInput style={[styles.input, {height: 100}]} placeholder="Description (optional)" value={description} multiline onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Price (e.g. 60.00)" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <View style={styles.chipsRow}>
        {(["starters","mains","desserts"] as Course[]).map(c => {
          const active = course === c;
          return (
            <TouchableOpacity key={c} style={[styles.chip, active && styles.chipActive]} onPress={() => setCourse(c)}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{c.toUpperCase()}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{flexDirection:"row", marginTop:16}}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {marginLeft:12}]} onPress={validateAndSave}>
          <Text style={styles.buttonTextPrimary}>{editingItem ? "Save" : "Add Dish"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 16, 
        backgroundColor: "#fff", 
        minHeight: "100%"
    },
    
    subtitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 12,
    },

    title: { 
        fontSize: 20, 
        fontWeight: "700", 
        marginBottom: 12
    },
    input: { borderWidth: 1, 
        borderColor: "#ddd", 
        borderRadius: 8, 
        padding: 10, 
        marginBottom: 10
    },
    chipsRow: { 
        flexDirection: "row", 
        gap: 8 
    },
    chip: { borderWidth:1, borderColor:"#ccc", borderRadius:20, paddingVertical:6, paddingHorizontal:12, marginRight:8 },
    chipActive: { backgroundColor:"#007AFF", borderColor:"#007AFF" },
    chipText: { color:"#333" },
    chipTextActive: { color:"#fff", fontWeight:"600" },
    button: { flex:1, padding:12, borderRadius:8, alignItems:"center", backgroundColor:"#eee" },
    buttonText: { color:"#333" },
    buttonTextPrimary: { color:"#fff", backgroundColor:"transparent" },
});
