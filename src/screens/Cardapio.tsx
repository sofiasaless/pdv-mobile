import React, { useState } from "react";
import {
  Button,
  Card,
  CheckBox,
  Divider,
  Input,
  Modal,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ItemComandaProps } from "../components/ItemComanda";
import { ItemCardapio } from "../components/ItemCardapio";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ItemConfirmacao } from "../components/ItemConfirmacao";

export const Cardapio = () => {
  const theme = useTheme();

  const [value, setValue] = useState<string>('');

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        {/* <View style={styles.conteudoUm}>

        </View> */}

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={styles.btnsView}>
            <Input
              placeholder='Pesquisar por produto'
              value={value}
              status="primary"
              appearance="outline"
              accessoryRight={<MaterialIcons name="search" size={24} color="#274BDB" />}
              onChangeText={nextValue => setValue(nextValue)}
            />
          </View>

          <View style={{ height: '70%' }}>
            <FlatList
              data={itensComanda}
              renderItem={({ item }) => <ItemCardapio descricao={item.descricao} preco={item.preco} />}
              numColumns={1}
              contentContainerStyle={{
                gap: 5,
              }}
            />
          </View>

          <View style={styles.btnsView}>
            <Button
              appearance="outline"
              accessoryRight={<Ionicons name="receipt" size={20} color="#3366FF" />}
            >Adicionar ao pedido</Button>
          </View>

        </View>

        <ModalConfirmacao />

      </View>
    </>
  )
}

export const ModalConfirmacao = () => {

  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.containerModal}>

      <Modal
        style={{
          width: '80%',
          height: '60%'
        }}
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card style={styles.cardModal} disabled={true}>
          <Text style={{ textAlign: 'center' }} category="label">Revise os itens do pedido</Text>
          
          <View style={{
            marginBlock: 10,
            height: '70%'
          }}>
            <FlatList
              data={itensComanda}
              renderItem={({ item }) => <ItemConfirmacao descricao={item.descricao} preco={item.preco} />}
              numColumns={1}
              contentContainerStyle={{
                gap: 3,
              }}
            />
          </View>
          <Button onPress={() => setVisible(false)}>
            Confirmar
          </Button>
        </Card>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '10%',
    flexDirection: 'column',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    justifyContent: 'flex-end',
    gap: '5%'
  },
  conteudoDois: {
    height: '100%',
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
  containerModal: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardModal: {
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red'
  }
});

const itensComanda: ItemComandaProps[] = [
  { id: 1, quantidade: 2, descricao: "Café expresso", horario: "08:15", preco: 5.5 },
  { id: 2, quantidade: 1, descricao: "Pão de queijo", horario: "08:20", preco: 4.0 },
  { id: 3, quantidade: 3, descricao: "Suco de laranja", horario: "08:45", preco: 7.0 },
  { id: 4, quantidade: 1, descricao: "Bolo de chocolate", horario: "09:00", preco: 6.5 },
  { id: 5, quantidade: 2, descricao: "Cappuccino", horario: "09:10", preco: 8.0 },
  { id: 6, quantidade: 1, descricao: "Torrada com manteiga", horario: "09:15", preco: 3.5 },
  { id: 7, quantidade: 4, descricao: "Refrigerante lata", horario: "09:30", preco: 6.0 },
  { id: 8, quantidade: 2, descricao: "Sanduíche natural", horario: "09:45", preco: 9.5 },
  { id: 9, quantidade: 1, descricao: "Pastel de carne", horario: "10:00", preco: 5.0 },
  { id: 10, quantidade: 2, descricao: "Água mineral", horario: "10:05", preco: 3.0 },
  { id: 11, quantidade: 1, descricao: "Milk-shake de morango", horario: "10:20", preco: 12.0 },
  { id: 12, quantidade: 3, descricao: "Empada de frango", horario: "10:40", preco: 4.5 },
  { id: 13, quantidade: 2, descricao: "Chá gelado", horario: "10:50", preco: 6.0 },
  { id: 14, quantidade: 1, descricao: "Bauru", horario: "11:10", preco: 10.0 },
  { id: 15, quantidade: 1, descricao: "Cookie de chocolate", horario: "11:15", preco: 4.5 }
];

const itensConfirma: ItemComandaProps[] = [
  { id: 1, quantidade: 2, descricao: "Café expresso", horario: "08:15", preco: 5.5 },
  { id: 2, quantidade: 1, descricao: "Pão de queijo", horario: "08:20", preco: 4.0 },
  { id: 3, quantidade: 3, descricao: "Suco de laranja", horario: "08:45", preco: 7.0 },
  { id: 4, quantidade: 1, descricao: "Bolo de chocolate", horario: "09:00", preco: 6.5 },
];