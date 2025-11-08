import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Homepage";
import AddEditDish from "./Screens/AddEditDish";
import { MenuProvider } from "./MenuContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={Home} />
          <Stack.Screen name="AddEditDish" component={AddEditDish} options={{ title: "Add / Edit Dish" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
