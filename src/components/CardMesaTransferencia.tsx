import { Card, Layout, Text, useTheme } from "@ui-kitten/components"
import { Alert, StyleSheet, View } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../routes/StackRoutes";
import { Mesa } from "../types/mesa.type";
import { mesaFirestore } from "../firestore/mesa.firestore";
import { useItensPedido } from "../context/ItensPedidoContext";

interface CardMesaTransferenciaProps {
  objetoMesa: Mesa,
  id_mesa_origem: string,
  disponibilizar: boolean
}

export const CardMesaTransferencia: React.FC<CardMesaTransferenciaProps> = ({ objetoMesa, id_mesa_origem, disponibilizar }) => {
  const theme = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const { itensPedido, limparItens } = useItensPedido()

  return (
    <Card
      style={[styles.card, {
        backgroundColor: (objetoMesa.status === 'disponivel') ? 'white' : (objetoMesa.status === 'ocupada') ? theme['color-success-600'] : theme['color-danger-400']
      }]}
      onPress={async () => {
        // transferindo pedidos
        try {
          await mesaFirestore.adicionarPedidos(itensPedido, objetoMesa.id_mesa ?? "");
          await mesaFirestore.removerPedidos(itensPedido, id_mesa_origem);
          if (disponibilizar) {
            await mesaFirestore.atualizarMesa('disponivel', id_mesa_origem);
          }
          limparItens()
          Alert.alert('Sucesso', 'Transferência realizada', [
            {
              text: 'OK',
              onPress: () => navigator.goBack()
            }
          ])

        } catch (error) {
          Alert.alert('Erro', 'Transferência NÃO realizada!', [
            {
              text: 'OK',
              onPress: () => navigator.goBack()
            }
          ])
        }
      }}
    >
      <View style={styles.txtLabel}>
        {
          (objetoMesa.status === 'disponivel') ?
            <MaterialIcons name="done" size={15} color={theme['color-primary-600']} />
            :
            (objetoMesa.status === 'ocupada')
              ?
              <MaterialIcons name="circle" size={15} color={theme['color-success-900']} />
              :
              <MaterialIcons name="error" size={15} color={theme['color-danger-900']} />
        }
        <Text
          style={{
            fontSize: 15,
            color: (objetoMesa.status === 'disponivel') ? theme['color-primary-900'] : (objetoMesa.status === 'ocupada') ? theme['color-success-900'] : theme['color-danger-900']
          }}
        >
          {objetoMesa.status.toUpperCase()}
        </Text>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 25 }}>MESA {(objetoMesa.numeracao < 10) ? `0${objetoMesa.numeracao}` : `${objetoMesa.numeracao}`}</Text>

    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    paddingVertical: 10
  },
  txtLabel: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})