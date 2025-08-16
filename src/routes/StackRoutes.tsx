import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Inicio: undefined;
  Comanda: { idMesa: string | undefined };
  Cardapio: { idMesa: string | undefined };
  Transferir: { idMesa: string | undefined, disponibilizarMesa: boolean | undefined };
  Configuracoes: undefined;
  HistoricoConta: { idHistorico: string | undefined };
};

const Stack = createStackNavigator<RootStackParamList>();

import { enableScreens } from 'react-native-screens';
import Inicio from '../screens/Inicio';
import { Comanda } from '../screens/Comanda';
import { Cardapio } from '../screens/Cardapio';
import Login from '../screens/Login';
import { AreaTransferencia } from '../screens/AreaTransferencia';
import { Configuracoes } from '../screens/Configuracoes';
import { HistoricoConta } from '../screens/HistoricoConta';

enableScreens();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Inicio"
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

      <Stack.Screen
        name="Transferir"
        component={AreaTransferencia}
        options={{
          title: 'Transferência',
          headerStyle: {
            backgroundColor: '#102694',
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{
          title: 'Configurações',
          headerStyle: {
            backgroundColor: '#102694',
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="HistoricoConta"
        component={HistoricoConta}
        options={{
          title: 'Configurações - Histórico da conta',
          headerStyle: {
            backgroundColor: '#102694',
          },
          headerTintColor: 'white',
        }}
      />

    </Stack.Navigator>
  );
}