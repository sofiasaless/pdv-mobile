import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import { historicoFirestore } from "../firestore/historico.firestore";
import React, { useState } from "react";
import { HistoricoMesa } from "../types/historicoMesa.type";
import { ItemVenda } from "../components/ItemVenda";
import { somarVendasDoDia } from "../util/texts.util";
import { converterParaDate, getDiaAnteriorAs16, setTimeFromString } from "../util/date.util";
import { DatePicker } from "../components/DatePicker";
import { Carregando } from "../components/Carregando";

export default function Vendas() {
  const theme = useTheme()

  const [vendasFiltradas, setVendasFiltradas] = useState<HistoricoMesa[]>([])

  const [carregando, setCarregando] = useState<boolean>(false)

  const [dataInicio, setDataInicio] = useState<Date>(getDiaAnteriorAs16())
  const [dataFim, setDataFim] = useState<Date>(new Date())

  const setingInicio = (tipo: 'DATA' | 'HORA', dado?: string) => {
    if (tipo === 'DATA' && dado != undefined) {
      setDataInicio(converterParaDate(dado))
    } else if (tipo === 'HORA' && dado != undefined) {
      let dataAtualizadaComHorario = setTimeFromString(dataInicio, dado)
      setDataInicio(dataAtualizadaComHorario)
    }
  }

  const setingFim = (tipo: 'DATA' | 'HORA', dado?: string) => {
    if (tipo === 'DATA' && dado != undefined) {
      setDataFim(converterParaDate(dado))
    } else if (tipo === 'HORA' && dado != undefined) {
      let dataAtualizadaComHorario = setTimeFromString(dataFim, dado)
      setDataFim(dataAtualizadaComHorario)
    }
  }

  const carregarVendas = async (data: Date) => {
    try {
      console.info('puxando vendas')
      setCarregando(true)
      // let arrayResultados = await historicoFirestore.recuperarHistoricoPorData(new Date)
      let arrayResultados = await historicoFirestore.recuperarHistoricoPorPeriodo(dataInicio, dataFim)
      setVendasFiltradas(arrayResultados)
      setCarregando(false)
    } catch (error) {
      setCarregando(false)
      Alert.alert('Erro ao carregar vendas', `${error}`)
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.areaForm}>
        <Text category="h6" style={{ textAlign: 'center' }}>Suas vendas periódicas</Text>
        <View style={styles.selecaoData}>
          <DatePicker dataPreEstabelecida={dataInicio} tamanBtn="small" tipo="date" setarData={setingInicio} />
          <DatePicker dataPreEstabelecida={dataInicio} tamanBtn="tiny" tipo="time" setarData={setingInicio} />

          <Text category="label">até</Text>

          <DatePicker dataPreEstabelecida={dataFim} tamanBtn="small" tipo="date" setarData={setingFim} />
          <DatePicker dataPreEstabelecida={dataFim} tamanBtn="tiny" tipo="time" setarData={setingFim} />

        </View>

        <Button
          size="small"
          status="info"
          appearance="outline"
          onPress={() => {
            setDataInicio(getDiaAnteriorAs16())
            setDataFim(new Date())
          }}
        >
          Restaurar datas
        </Button>

        <Button
          size="small"
          status="success"
          onPress={() => {
            carregarVendas(new Date())
          }}
        >Ver vendas</Button>
      </View>


      <View style={styles.listaVendas}>
        {
          (carregando) ?
            <Carregando />
            :
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
        }
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
  },
  selecaoData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    justifyContent: 'center',
    width: '100%'
  }
});