import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './navigation/navigationRoutes';

function App() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}

registerRootComponent(App);
