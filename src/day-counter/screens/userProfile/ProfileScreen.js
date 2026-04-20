import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  LogOut, 
  ChevronRight, 
  UserCircle,
  Clock,
  CalendarDays
} from 'lucide-react-native';
import profileStyles from './profileStyle';
import layoutStyles from '../../components/layout/layoutStyles';
import { AppHeader, MenuSelector } from '../../components/layout/layoutComponent';

const ProfileScreen = (props) => {
  const { activeTab, setActiveTab } = props;
  const menuItems = [
    { id: 'edit-name', label: 'Editar nome', icon: User },
    { id: 'edit-email', label: 'Alterar email', icon: Mail },
    { id: 'edit-password', label: 'Alterar senha', icon: Lock },
    { id: 'notifications', label: 'Notificações', icon: Bell },
  ];

  const stats = [
    { label: 'Total de Contadores', value: 4 },
    { label: 'Total de Ofensivas', value: 12 },
  ];

  return (
    <SafeAreaView style={layoutStyles.container}>
      <AppHeader title="Perfil" />
      
      <ScrollView style={profileStyles.scrollView} contentContainerStyle={profileStyles.content}>
        {/* User Info Card */}
        <View style={profileStyles.userCard}>
          <Text style={profileStyles.userName}>Pedro Oliveira</Text>
          <Text style={profileStyles.userEmail}>pedro.oliveira@email.com</Text>
        </View>

        <View style={profileStyles.divider} />

        {/* Stats Cards Section */}
        <View style={profileStyles.statsContainer}>
          {stats.map((stat) => (
            <View key={stat.label} style={profileStyles.statCard}>
              <Text style={profileStyles.statValue}>{stat.value}</Text>
              <Text style={profileStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={profileStyles.divider} />

        {/* Menu Items */}
        <View style={profileStyles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={profileStyles.menuItem} activeOpacity={0.7}>
              <View style={profileStyles.menuIconContainer}>
                <item.icon size={22} color="#A855F7" strokeWidth={2.5} />
              </View>
              <Text style={profileStyles.menuItemText}>{item.label}</Text>
              <ChevronRight size={24} color="#1F2937" strokeWidth={3} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout FAB */}
      <View style={profileStyles.logoutContainer}>
        <TouchableOpacity style={profileStyles.logoutButton} activeOpacity={0.8}>
          <LogOut size={32} color="#FFFFFF" strokeWidth={2.5} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      <MenuSelector activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

