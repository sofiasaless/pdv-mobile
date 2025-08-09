import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import Login from './src/screens/Login';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Login />
      <StatusBar style="light" />
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
