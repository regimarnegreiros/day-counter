import { Text, View, TouchableOpacity } from 'react-native';
import { Clock, Calendar, User} from 'lucide-react-native';
import styles from './layoutStyles';

export const TabItem = ({ icon, label, active }) => (
  <TouchableOpacity style={styles.tabButton}>
    {icon}
    <Text style={[styles.tabText, active && styles.tabActive]}>{label}</Text>
  </TouchableOpacity>
);

export const MenuSelector = () => (
  <View style={styles.tabBar}>
    <TabItem icon={<Clock style={styles.activeIcon} />} label="Contadores" />
    <TabItem icon={<Calendar style={styles.inactiveIcon} />} label="Ofensivas" active />
    <TabItem icon={<User style={styles.inactiveIcon} />} label="Perfil" />
  </View>
);


export const AppHeader = ({title}) => (
  <View style={styles.header}>
    <View style={styles.headerIconBox}>
      <Calendar color="white" size={20} />
    </View>
    <View>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>Quarta-feira, 11 de março de 2026</Text>
    </View>
  </View>
);
