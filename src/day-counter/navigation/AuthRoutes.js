import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InputsView from "../screens/login-cadastro/InputsView";

const Stack = createNativeStackNavigator();

export default function AuthRoutes({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin">
        {({ navigation }) => (
          <InputsView screenType="signin" navigation={navigation} onLogin={onLogin} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {({ navigation }) => (
            <InputsView screenType="signup" navigation={navigation} onLogin={onLogin} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
