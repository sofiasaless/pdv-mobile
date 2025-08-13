import { StyleSheet, View } from "react-native"
import { dataFirebaseParaDataNormal, somarPedidos } from "../util/texts.util"
import { HistoricoMesa } from "../types/historicoMesa.type"
import { Text } from "@ui-kitten/components"

export interface ItemVendaProps {
  objeto: HistoricoMesa
}

export const ItemVenda: React.FC<ItemVendaProps> = ({ objeto }) => {

  return (
    <View style={[styles.container, { backgroundColor: '#C5CEE0' }]}>
      <Text category="h6">Mesa {objeto?.numeracao}</Text>
      <Text category="s2">Encerrada às {dataFirebaseParaDataNormal(objeto?.encerradoEm ?? "")}</Text>
      <Text category="s1" style={{ fontWeight: 'bold' }}>R$ {(somarPedidos(objeto.pedidos)).toFixed(2)}</Text>
    </View>
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