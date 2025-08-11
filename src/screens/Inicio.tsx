const icone = require("../public/icone-logo.png");
import {
  Button,
  CheckBox,
  Divider,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CardMesa } from "../components/CardMesa";
import { QuantidadeInfo } from "../components/QuantidadeInfo";
import { useCallback, useEffect, useState } from "react";
import { Mesa, StatusMesa } from "../types/mesa.type";
import { mesaFirestore } from "../firestore/mesa.firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function Inicio() {
  const theme = useTheme();

  const [mesas, setMesas] = useState<Mesa[]>([])
  const [qtdMesas, setQtdMesas] = useState<number[]>([])

  async function carregarMesas(status: StatusMesa | 'todas') {
    if (status === 'todas') {
      await mesaFirestore.recuperarMesas().then((dados) => {
        if (dados != undefined) {
          setMesas(dados)
        }
      })
    } else {

    }

    await mesaFirestore.contarMesas().then((dados) => {
      setQtdMesas(dados ?? [])
    })
  }


  useFocusEffect(
    useCallback(() => {
      carregarMesas('todas')
    },[])
  );


  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        <View style={styles.conteudoUm}>

          <View style={[styles.conteudoUmInterno]}>
            <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='h5'>
              Bem-vindo ao Up! PDV
            </Text>
            <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='caption'>
              Operador Gerente
            </Text>
          </View>

          <View style={[styles.conteudoUmInterno]}>
            <Button size="medium" style={{ padding: 0, justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialIcons name="settings" size={80} color="white" />
            </Button>
          </View>

        </View>

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={styles.infosMesa}>
            <QuantidadeInfo tema="primary" descricao={`livres`} quantidade={qtdMesas[0]} />
            <QuantidadeInfo tema="success" descricao="ocupadas" quantidade={qtdMesas[1]} />
            <QuantidadeInfo tema="danger" descricao="aguardando" quantidade={qtdMesas[2]} />
          </View>

          <Divider />

          {/* <View style={styles.filtragem}>
            <CheckBox status='primary'>Livres</CheckBox>
            <CheckBox status='success'>Ocupadas</CheckBox>
            <CheckBox status='danger'>Aguardando</CheckBox>
          </View> */}

          <FlatList
            data={mesas}
            // keyExtractor={Math.random()}
            renderItem={({ item }) => <CardMesa numeracao={item.numeracao} pedidos={[]} id_mesa={item.id_mesa} status={item.status as StatusMesa} />}
            numColumns={2}
            columnWrapperStyle={{
              gap: 10,
              justifyContent: "flex-start",
            }}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 20
            }}
            showsVerticalScrollIndicator={false}
          />

        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '20%',
    flexDirection: 'row',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    justifyContent: 'space-between'
  },
  conteudoUmInterno: {
    justifyContent: 'flex-end'
  },
  conteudoDois: {
    height: '80%',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    paddingHorizontal: '8%',
    paddingVertical: '8%',
    gap: '2%'
  },
  text: {
    textAlign: 'left'
  },
  filtragem: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  infosMesa: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10
  },
  mesaContainer: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});