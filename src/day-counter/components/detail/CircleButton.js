import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CircleButton(props) {
  return (
    <TouchableOpacity style={styles.circleButton} onPress={props.onPress}>
      <Feather name={props.iconName} size={20} color="#000" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
