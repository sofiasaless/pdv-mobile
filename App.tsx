import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import Routes from './src/routes';
import { ItensPedidoProvider } from './src/context/ItensPedidoContext';

export default function App() {
  return (
    <ItensPedidoProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Routes />
        <StatusBar style="light" />
      </ApplicationProvider>
    </ItensPedidoProvider>
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
