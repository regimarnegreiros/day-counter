import { Text, View, TouchableOpacity } from 'react-native';
import { Clock, Calendar, User} from 'lucide-react-native';
import styles from './layoutStyles';
import { useState } from 'react';

function makeIcon(Icon) {
  return (active) => (<Icon style={active? styles.activeIcon : styles.inactiveIcon}/>);
}

export const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    {icon(active)}
    <Text style={[styles.tabText, active && styles.tabActive]}>{label}</Text>
  </TouchableOpacity>
);

export const MenuSelector = () => {
  const [activeTab, setActiveTab] = useState("Contadores");

  return (
    <View style={styles.tabBar}>
      <TabItem
        icon={makeIcon(Clock)}
        label="Contadores"
        active={activeTab === "Contadores"}
        onPress={() => setActiveTab("Contadores")}
      />
      <TabItem
        icon={makeIcon(Calendar)}
        label="Ofensivas"
        active={activeTab === "Ofensivas"}
        onPress={() => setActiveTab("Ofensivas")}
      />
      <TabItem
        icon={makeIcon(User)}
        label="Perfil"
        active={activeTab === "Perfil"}
        onPress={() => setActiveTab("Perfil")}
      />
    </View>
  )
};

export const AppHeader = ({title}) => {
  const data = new Date();
  const mesString = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ][data.getMonth()];
  const diaSemanaString = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
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
  )
};
