import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar } from "react-native";

import Homepage from "./Screens/Homepage";
import AddEditDish from "./Screens/AddEditDish";
import FilterMenu from "./Screens/FilterMenu";

export type Dish = {
  id: string;
  name: string;
  description?: string;
  price: number;
  course: "starters" | "mains" | "desserts";
};

export type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  AddEditDish: undefined;
  FilterMenu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [menu, setMenu] = useState<Dish[]>([
    {
      id: "1",
      name: "Garlic Bread",
      description: "Crispy bread with garlic butter.",
      price: 40,
      course: "starters",
    },
    {
      id: "2",
      name: "Steak and Chips",
      description: "Juicy sirloin with fries.",
      price: 120,
      course: "mains",
    },
    {
      id: "3",
      name: "Chocolate Cake",
      description: "Rich chocolate cake.",
      price: 65,
      course: "desserts",
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ title: "Menu" }}
          >
            {(props) => <Homepage {...props} menu={menu} setMenu={setMenu} />}
          </Stack.Screen>

          <Stack.Screen
            name="AddEditDish"
            options={{ title: "Add / Edit Dish" }}
          >
            {(props) => <AddEditDish {...props} menu={menu} setMenu={setMenu} />}
          </Stack.Screen>

          <Stack.Screen
            name="FilterMenu"
            options={{ title: "Filter Menu" }}
          >
            {(props) => <FilterMenu {...props} menu={menu} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
