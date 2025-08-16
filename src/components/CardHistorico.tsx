import { Card, Divider, Text } from "@ui-kitten/components";
import { HistoricoMesa } from "../types/historicoMesa.type";
import { StyleSheet, View } from "react-native";
import { dataFirebaseParaDataNormalExtensa, somarPedidos } from "../util/texts.util";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/StackRoutes";

interface CardHistoricoProps {
  objeto?: HistoricoMesa
}

export const CardHistorico: React.FC<CardHistoricoProps> = ({ objeto }) => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Card
      style={styles.card}
      status='warning'
      onPress={() => {
        navigator.navigate('HistoricoConta', {
          idHistorico: objeto?.id_historico
        })
      }}
    >
      <View style={styles.containerTxts}>
        <Text category="h5">
          MESA {objeto?.numeracao}
        </Text>
        <Text category="s2">
          Encerrada em {dataFirebaseParaDataNormalExtensa(objeto?.encerradoEm)}
        </Text>
      </View>


      <Divider />

      <View style={styles.containerTotal}>
        <Text category="s1">Total da conta:</Text>
        <Text category="s1">R$ {somarPedidos(objeto?.pedidos).toFixed(2)}</Text>
      </View>

    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    minWidth: 350,
    maxWidth: 400,
  },
  containerTxts: {
    marginBottom: 5
  },
  containerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  }
});
