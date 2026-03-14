import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Calendar, User, Plus } from 'lucide-react-native';
import styles from './styles';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style='dark' />

        <View style={styles.header}>
          <View style={styles.headerIconBox}>
            <Calendar color="white" size={20} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Contagem de dias</Text>
            <Text style={styles.headerSubtitle}>segunda-feira, 9 de março de 2026</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.fab}>
          <Plus color="white" size={30} />
        </TouchableOpacity>

        <View style={styles.tabBar}>
          <TabItem icon={<Clock size={22} color="#AF52DE" />} label="Contadores" />
          <TabItem icon={<Calendar size={22} color="#777777" />} label="Ofensivas" active />
          <TabItem icon={<User size={22} color="#777777" />} label="Perfil" />
        </View>


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
