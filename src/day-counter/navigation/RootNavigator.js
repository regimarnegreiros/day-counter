import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./navigationRoutes";
import CounterDetail from "../screens/detail/CounterDetail";
import { AuthContext } from "../contexts/AuthContext";

const Root = createNativeStackNavigator();

export default function RootNavigator() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      {signed ? (
        <Root.Group>
          <Root.Screen name="App" component={AppRoutes} />
          <Root.Screen name="CounterDetail" component={CounterDetail} />
        </Root.Group>
      ) : (
        <Root.Screen name="Auth" component={AuthRoutes} />
      )}
    </Root.Navigator>
  );
}
