import React, { useState } from 'react';
import { registerRootComponent } from 'expo';
import ProfileScreen from './screens/userProfile/ProfileScreen';
import CounterScreen from './screens/counter/CounterScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('Contadores');

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === 'Perfil') {
    return <ProfileScreen activeTab={currentScreen} setActiveTab={handleNavigation} />;
  }

  return <CounterScreen activeTab={currentScreen} setActiveTab={handleNavigation} />;
}

registerRootComponent(App);
