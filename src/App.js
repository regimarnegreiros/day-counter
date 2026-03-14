import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Calendar, User, Plus, Menu } from 'lucide-react-native';
import styles from './styles';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style='dark' />

        <AppHeader title='Contagem de Dias' />

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.fab}>
          <Plus color="white" size={30} />
        </TouchableOpacity>

        <MenuSelector />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const TabItem = ({ icon, label, active }) => (
  <TouchableOpacity style={styles.tabButton}>
    {icon}
    <Text style={[styles.tabText, active && styles.tabActive]}>{label}</Text>
  </TouchableOpacity>
);


const MenuSelector = () => (
  <View style={styles.tabBar}>
    <TabItem icon={<Clock style={styles.activeIcon} />} label="Contadores" />
    <TabItem icon={<Calendar style={styles.inactiveIcon} />} label="Ofensivas" active />
    <TabItem icon={<User style={styles.inactiveIcon} />} label="Perfil" />
  </View>
);

const AppHeader = ({title}) => (
  <View style={styles.header}>
    <View style={styles.headerIconBox}>
      <Calendar color="white" size={20} />
    </View>
    <View>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>segunda-feira, 9 de março de 2026</Text>
    </View>
  </View>
);

