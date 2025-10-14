import { StyleSheet, TouchableOpacity, View } from "react-native"
import { dataFirebaseParaDataNormal, somarPedidos } from "../util/texts.util"
import { HistoricoMesa } from "../types/historicoMesa.type"
import { Text } from "@ui-kitten/components"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../routes/StackRoutes"

export interface ItemVendaProps {
  objeto: HistoricoMesa
}

export const ItemVenda: React.FC<ItemVendaProps> = ({ objeto }) => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: '#C5CEE0' }]}
      onPress={() => {
        navigator.navigate('HistoricoConta', {
          idHistorico: objeto?.id_historico
        })
      }}
    >
      <Text category="h6">Mesa {objeto?.numeracao}</Text>
      <Text category="s2">Encerrada às {dataFirebaseParaDataNormal(objeto?.encerradoEm ?? "")}</Text>
      <Text category="s1" style={{ fontWeight: 'bold' }}>R$ {(somarPedidos(objeto.pedidos)).toFixed(2)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBlock: '7%',
    paddingInline: '3%',
    alignItems: 'center',
    gap: '3%',
    borderRadius: 5,
    justifyContent: 'space-between'
  }
})