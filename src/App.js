import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Calendar, User, Plus } from 'lucide-react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee'
  },
  headerIconBox: {
    backgroundColor: '#AD46FF',
    padding: 10,
    borderRadius: 12,
    margin: 12,
    alignSelf: 'flex-start'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  headerSubtitle: {
    fontSize: 12, color: '#777777'
  },

  tabBar: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center'
  },
  tabLabel: {
    fontSize: 10,
    color: '#777777',
    marginTop: 4
  },
  tabButton: {
    flex: 1,
    alignItems: 'center'
  },

  fab: {
    position: 'absolute', right: 20, bottom: 90,
    backgroundColor: '#AF52DE', width: 60, height: 60,
    borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5,
  },
});
