import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Comanda: { idMesa: string | undefined };
  Cardapio: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

import { enableScreens } from 'react-native-screens';
import Inicio from '../screens/Inicio';
import { Comanda } from '../screens/Comanda';
import { Cardapio } from '../screens/Cardapio';
enableScreens();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Inicio}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Comanda"
        component={Comanda}
        options={{
          title: 'Comanda',
          headerStyle: {
            backgroundColor: '#102694',
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="Cardapio"
        component={Cardapio}
        options={{
          title: 'Cardápio',
          headerStyle: {
            backgroundColor: '#102694',
          },
          headerTintColor: 'white',
        }}
      />

    </Stack.Navigator>
  );
}