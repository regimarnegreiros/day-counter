import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import layoutStyle from '../../components/layout/layoutStyles';

import {AppHeader, MenuSelector} from '../../components/layout/layoutComponent';
import { InsertForm } from '../../components/create_counter/createCounter';
import { View, TouchableOpacity, Button, Modal } from 'react-native';
import { useState } from 'react';

export default function CounterScreen() {
  const [showCreateCount, setShowCreateCount] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={layoutStyle.container}>
        <StatusBar style='dark' />

        <AppHeader title='Contagem de Dias' />

        <View style={{ flex: 1, justifyContent: 'center'}} >
          {showCreateCount?(<InsertForm showForm={setShowCreateCount}/>):(null)}
        </View>

        <TouchableOpacity style={layoutStyle.fab}
        onPress={() => setShowCreateCount(!showCreateCount)}
        >
          <Plus color="white" size={30} />
        </TouchableOpacity>

        <MenuSelector />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CounterScreen;
