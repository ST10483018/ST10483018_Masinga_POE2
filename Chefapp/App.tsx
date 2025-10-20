import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
}
// Removed the specific React Native import and kept the general structure
from "react-native"; 
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Course = "all" | "starters" | "mains" | "desserts";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  course: "starters" | "mains" | "desserts";
};

interface Props {
  navigation: HomeNavigationProp;
  menu?: MenuItem[];
  addDish?: (newDish: Omit<MenuItem, "id">) => void;
}
const defaultMenu: MenuItem[] = [
    { id: "1", name: "Caesar Salad", description: "Fresh romaine with Caesar dressing", price: 45, course: "starters" },
    { id: "2", name: "Grilled Chicken", description: "Served with seasonal vegetables", price: 85, course: "mains" },
    { id: "3", name: "Chocolate Cake", description: "Rich chocolate layered cake", price: 35, course: "desserts" },
  ];

export default function Home({ navigation, menu = defaultMenu, addDish }: Props): React.JSX.Element {
  const [selectedCourse, setSelectedCourse] = useState<Course>("all");
  // The 'loading' state is used correctly below (it's a boolean)
  const [loading] = useState(false); 

  // Filter dishes by course
  const filteredItems: MenuItem[] =
    selectedCourse === "all"
      ? menu
      : menu.filter((item) => item.course === selectedCourse);

  // Group by course for section display
  const groupedItems = filteredItems.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      if (!acc[item.course]) acc[item.course] = [];
      acc[item.course].push(item);
      return acc;
    },
    {}
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Christoffel’s Dining Menu</Text>
        </View>

        {/* Dish counter */}
        <Text style={styles.subtitle}>Total Dishes: {filteredItems.length}</Text>

        {/* Filter Buttons */}
        <Text style={styles.label}>Filter by Course</Text>
        <View style={styles.courseRow}>
          {(["all", "starters", "mains", "desserts"] as Course[]).map((c) => (
            <TouchableOpacity
              key={c}
              // The logic below correctly evaluates to a boolean or style object
              style={[
                styles.courseButton,
                selectedCourse === c && styles.courseButtonActive,
              ]}
              // No problematic string props used here
              onPress={() => setSelectedCourse(c)}
            >
              <Text
                style={
                  selectedCourse === c ? styles.courseTextActive : styles.courseText
                }
              >
                {c.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        {loading ? (
          // The ActivityIndicator prop 'animating' is correctly defaulted to true
          // or can be explicitly set: animating={true} (not needed as size prop implies it)
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
                    <View>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>R {item.price}</Text>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      {/* Styles omitted for brevity, but they should be in styles={...} */}
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5", 
  },
  content: { 
    padding: 16,   
  paddingBottom: 32, 
  },
  header: { 
    marginBottom: 16, 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center", 
  },
  subtitle: { 
    fontSize: 18, 
    textAlign: "center", 
    marginBottom: 16, 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 8, 
  },
  courseRow: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 16, 
  },
  courseButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 20, 
    backgroundColor: "#e0e0e0", 
  },
  courseButtonActive: { 
    backgroundColor: "#007AFF", 
  },  
  courseText: { 
    color: "#000", 
  },  
  courseTextActive: { 
    color: "#fff", 
  },  
  menuContainer: {  
    marginTop: 16,  
  },  
  section: {  
    marginBottom: 24,  
  },  
  sectionTitle: {  
    fontSize: 20,  
    fontWeight: "bold",  
    marginBottom: 12,  
  },  
  itemCard: {  
    backgroundColor: "#fff",  
    padding: 12,  
    borderRadius: 8,  
    marginBottom: 12,  
    shadowColor: "#000",  
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.1,  
    shadowRadius: 4,  
    elevation: 2,  
  },  
  itemName: {  
    fontSize: 16,  
    fontWeight: "bold",  
  },  
  itemPrice: {  
    fontSize: 14,  
    color: "#888",  
    marginBottom: 8,  
  },  
  itemDescription: {  
    fontSize: 14,  
    color: "#555", 
  },  
  emptyText: {  
    textAlign: "center",  
    fontSize: 16,  
    color: "#888",  
    marginTop: 32,  
  },  
});