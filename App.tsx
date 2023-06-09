import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation/Navigation';
import Splash from './screens/Splash';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  if (!appIsReady) {
    return (
      <Splash
        appIsReady={appIsReady}
        setAppIsReady={setAppIsReady}
        persistor={persistor}
      />
    );
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigation />
            <StatusBar style='auto' />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
