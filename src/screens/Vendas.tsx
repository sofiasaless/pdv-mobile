import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import { historicoFirestore } from "../firestore/historico.firestore";
import { useState } from "react";
import { HistoricoMesa } from "../types/historicoMesa.type";
import { ItemVenda } from "../components/ItemVenda";
import { somarPedidos, somarVendasDoDia } from "../util/texts.util";

export default function Vendas() {
  const theme = useTheme()

  const [vendasFiltradas, setVendasFiltradas] = useState<HistoricoMesa[]>([])

  const carregarVendas = async (data: Date) => {
    let arrayResultados = await historicoFirestore.recuperarHistoricoPorData(new Date)
    setVendasFiltradas(arrayResultados)
  }

  return (
    <View style={styles.container}>

      <View style={styles.areaForm}>
        <Text category="h6" style={{ textAlign: 'center' }}>Suas vendas diárias</Text>
        <Button
          size="small"
          status="success"
          onPress={() => {
            carregarVendas(new Date())
          }}
        >Ver vendas de hoje</Button>
      </View>


      <View style={styles.listaVendas}>
        <FlatList
          data={vendasFiltradas}
          keyExtractor={(item) => item.id_historico ?? (item.encerradoEm).toLocaleString()}
          renderItem={({ item }) => (
            <ItemVenda
              objeto={item}
            />
          )}
          numColumns={1}
          contentContainerStyle={{ gap: 3 }}
        />
      </View>

      <View style={[styles.totalConta, { backgroundColor: theme['color-warning-300'] }]}>
        <Text style={{ color: theme['color-warning-900'], fontSize: 18 }} >TOTAL</Text>
        <Text style={{ color: theme['color-warning-900'], fontSize: 18 }} >R$ {somarVendasDoDia(vendasFiltradas).toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    paddingTop: 15,
    paddingInline: '5%',
    gap: 15
  },
  areaForm: {
    gap: 10
  },
  areaExclusao: {
    gap: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  listaVendas: {
    height: '60%',
    gap: 5,
    // backgroundColor: 'red',
  },
  totalConta: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5
  }
});