import React, { useEffect, useState } from "react";
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
import { LabelInfo } from "../components/LabelInfo";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ItemComanda, ItemComandaProps } from "../components/ItemComanda";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/StackRoutes";
import { Mesa, StatusMesa } from "../types/mesa.type";
import { mesaFirestore } from "../firestore/mesa.firestore";

type ComandaRouteProp = RouteProp<RootStackParamList, "Comanda">;

type Props = {
  route: ComandaRouteProp;
};

export const Comanda: React.FC<Props> = ({ route }) => {
  const theme = useTheme();

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const id = route.params.idMesa;

  const [mesa, setMesa] = useState<Mesa>()
  const [total, setTotal] = useState<number>(0)

  const carregarMesa = async () => {
    if (id != undefined) {
      await mesaFirestore.recuperarMesaPorId(id).then((dados) => {
        if (dados != undefined) {
          setMesa(dados)
          setTotal(dados.pedidos.reduce((acc, item) => acc + item.preco * item.quantidade, 0));
        }
      })
    }
  }

  useEffect(() => {
    carregarMesa()
  }, [id])

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        <View style={styles.conteudoUm}>

          <View style={[styles.conteudoUmInterno]}>
            <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='h4'>
              MESA {mesa?.numeracao}
            </Text>
            <LabelInfo descricao={mesa?.status as StatusMesa ?? ""} tamanhoLetra="s2"/>
          </View>

          <View style={[styles.conteudoInternoDois, { backgroundColor: theme['color-warning-300'] }]}>
            <Text style={{ color: theme['color-warning-900'] }} category="s1">TOTAL</Text>
            <Text style={{ color: theme['color-warning-900'] }} category="s1">R$ {total.toFixed(2)}</Text>
          </View>

        </View>

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={styles.btnsView}>
            <Button
              status="warning"
              appearance="outline"
              size="small"
              accessoryRight={<AntDesign name="plus" size={15} color="#DB8B00" />}
              onPress={() => {
                navigator.navigate('Cardapio')
              }}
            >Selecionar produto do cardápio</Button>
          </View>

          <View style={{ height: '60%' }}>
            <FlatList
              data={mesa?.pedidos}
              renderItem={({ item, index }) => (
                <ItemComanda
                  indice={index}
                  objeto={item}
                />
              )}
              numColumns={1}
            />
          </View>

          <View style={styles.btnsView}>
            <Button
              accessoryRight={<Ionicons name="receipt" size={20} color="white" />}
            >Encerrar conta</Button>

            <View style={styles.btnsOtherView}>
              <Button status="success" style={{ flex: 1 }}
                accessoryRight={<MaterialCommunityIcons name="transfer" size={20} color="white" />}
              >Transferir itens</Button>
              <Button status="danger" style={{ flex: 1 }}
                accessoryRight={<MaterialCommunityIcons name="trash-can" size={20} color="white" />}
              >Excluir itens</Button>
            </View>
          </View>

        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '20%',
    flexDirection: 'column',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    justifyContent: 'flex-end',
    gap: '5%'
  },
  conteudoUmInterno: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'grey',
    width: '100%'
  },
  conteudoInternoDois: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingInline: '2%',
    paddingBlock: '1%',
    borderRadius: 3
  },
  conteudoDois: {
    height: '80%',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // paddingHorizontal: '8%',
    paddingVertical: '8%',
    gap: '2%'
  },
  btnsView: {
    paddingHorizontal: '8%',
    gap: '6%'
  },
  btnsOtherView: {
    flexDirection: 'row',
    gap: '5%',
    justifyContent: 'space-between',
    width: '100%',
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

// const itensComanda: ItemComandaProps[] = [
//   { id: 1, quantidade: 2, descricao: "Café expresso", horario: "08:15", preco: 5.5 },
//   { id: 2, quantidade: 1, descricao: "Pão de queijo", horario: "08:20", preco: 4.0 },
//   { id: 3, quantidade: 3, descricao: "Suco de laranja", horario: "08:45", preco: 7.0 },
//   { id: 4, quantidade: 1, descricao: "Bolo de chocolate", horario: "09:00", preco: 6.5 },
//   { id: 5, quantidade: 2, descricao: "Cappuccino", horario: "09:10", preco: 8.0 },
//   { id: 6, quantidade: 1, descricao: "Torrada com manteiga", horario: "09:15", preco: 3.5 },
//   { id: 7, quantidade: 4, descricao: "Refrigerante lata", horario: "09:30", preco: 6.0 },
//   { id: 8, quantidade: 2, descricao: "Sanduíche natural", horario: "09:45", preco: 9.5 },
//   { id: 9, quantidade: 1, descricao: "Pastel de carne", horario: "10:00", preco: 5.0 },
//   { id: 10, quantidade: 2, descricao: "Água mineral", horario: "10:05", preco: 3.0 },
//   { id: 11, quantidade: 1, descricao: "Milk-shake de morango", horario: "10:20", preco: 12.0 },
//   { id: 12, quantidade: 3, descricao: "Empada de frango", horario: "10:40", preco: 4.5 },
//   { id: 13, quantidade: 2, descricao: "Chá gelado", horario: "10:50", preco: 6.0 },
//   { id: 14, quantidade: 1, descricao: "Bauru", horario: "11:10", preco: 10.0 },
//   { id: 15, quantidade: 1, descricao: "Cookie de chocolate", horario: "11:15", preco: 4.5 }
// ];
