import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { store, persistor } from '@/store/store';
import { RootNavigator } from '@/navigation/RootNavigator';
import { navigationRef } from '@/navigation/NavigationService';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
            <Toast position="bottom" />
          </NavigationContainer>
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
