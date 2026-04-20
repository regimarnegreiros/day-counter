import { Text, View, TouchableOpacity } from "react-native";
import { Clock, Calendar, User } from "lucide-react-native";
import styles from "./layoutStyles";
import { useState } from "react";

function makeIcon(Icon) {
  return (active) => (
    <Icon style={active ? styles.activeIcon : styles.inactiveIcon} />
  );
}

export const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    {icon(active)}
    <Text style={[styles.tabText, active && styles.tabActive]}>{label}</Text>
  </TouchableOpacity>
);

export const MenuSelector = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Recupera o ícone que definimos lá no Navigator
        const IconComponent = options.tabBarIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={route.name}
            icon={makeIcon(IconComponent)}
            label={route.name}
            active={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

export const AppHeader = ({ title }) => {
  const data = new Date();
  const mesString = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ][data.getMonth()];
  const diaSemanaString = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ][data.getDay()];
  const dataString = `${diaSemanaString}, ${data.getDate()} de ${mesString} de ${data.getFullYear()}`;

  return (
    <View style={styles.header}>
      <View style={styles.headerIconBox}>
        <Calendar color="white" size={20} />
      </View>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{dataString}</Text>
      </View>
    </View>
  );
};
