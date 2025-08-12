import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import Routes from './src/routes';
import { ItensPedidoProvider } from './src/context/ItensPedidoContext';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ItensPedidoProvider>
        <Routes />
        <StatusBar style="light" />
      </ItensPedidoProvider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
