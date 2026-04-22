import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./navigationRoutes";
import CounterDetail from "../screens/detail/CounterDetail";

const Root = createNativeStackNavigator();

export default function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // troque para true para debug

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      {isAuthenticated ? (
        <Root.Group>
          <Root.Screen name="App" component={AppRoutes} />
          <Root.Screen name="CounterDetail" component={CounterDetail} />
        </Root.Group>
      ) : (
        <Root.Screen name="Auth">
          {
            () => (
              <AuthRoutes onLogin={() => setIsAuthenticated(true)} />
            ) /* depois integrar com API */
          }
        </Root.Screen>
      )}
    </Root.Navigator>
  );
}
