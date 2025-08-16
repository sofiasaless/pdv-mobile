import { RouteProp } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../routes/StackRoutes";
import { Button, Text, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { HistoricoMesa } from "../types/historicoMesa.type";
import { historicoFirestore } from "../firestore/historico.firestore";
import { dataFirebaseParaDataNormalExtensa, somarPedidos } from "../util/texts.util";
import { ItemHistorico } from "../components/ItemHistorico";
import { imprimirPedidosDaMesa, imprimirPedidosDoHistorico } from "../util/printer.util";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type HistoricoContaProp = RouteProp<RootStackParamList, "HistoricoConta">;

type Props = {
  route: HistoricoContaProp;
};

export const HistoricoConta: React.FC<Props> = ({ route }) => {
  const theme = useTheme();

  const id = route.params.idHistorico;

  const [historico, setHistorico] = useState<HistoricoMesa>()

  const carregarHistoricoContaMesa = async () => {
    if (id != undefined) {
      await historicoFirestore.recuperarHistoricoPorId(id).then((dado) => {
        setHistorico(dado);
      })
    }
  }

  useEffect(() => {
    carregarHistoricoContaMesa();
  }, [id])

  return (
    <View style={styles.container}>

      <View style={styles.areaInfos}>
        <Text category="h5">Mesa {historico?.numeracao}</Text>
        <Text category="s1">Encerrada em {dataFirebaseParaDataNormalExtensa(historico?.encerradoEm ?? "")}</Text>
      </View>

      <View style={{ height: '60%' }}>
        <FlatList
          data={historico?.pedidos}
          keyExtractor={(item) => (item.id).toString()}
          renderItem={({ item }) => (
            <ItemHistorico
              objeto={item}
              indice={1}
            />
          )}
          numColumns={1}
          contentContainerStyle={{ gap: 3 }}
        />
      </View>
      <View style={[styles.totalConta, { backgroundColor: theme['color-warning-300'] }]}>
        <Text style={{ color: theme['color-warning-900'], fontSize: 18 }} >TOTAL</Text>
        <Text style={{ color: theme['color-warning-900'], fontSize: 18 }} >R$ {somarPedidos(historico?.pedidos).toFixed(2)}</Text>
      </View>

      <View style={{paddingInline: '5%'}}>
        <Button status="info"
          accessoryRight={<MaterialIcons name="print" size={20} color="white" />}
          onPress={async () => {
            let historicoObj = historico as HistoricoMesa
            await imprimirPedidosDoHistorico(historicoObj)
          }}
        >Imprimir</Button>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    gap: 10
  },
  areaInfos: {
    paddingInline: '5%'
  },
  totalConta: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginInline: '5%',
    padding: 10,
    borderRadius: 5
  }
});