import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Produto } from "../types/produto.type";
import { cardapioFirestore } from "../firestore/cardapio.firestore";
import { ItemCardapioEditar } from "../components/ItemCardapioEditar";
import { useItensPedido } from "../context/ItensPedidoContext";

export interface CursorPaginacao {
  primeiroDoc: QueryDocumentSnapshot<DocumentData> | null;
  ultimoDoc: QueryDocumentSnapshot<DocumentData> | null;
}

export default function Produtos() {

  const [descricao, setDescricao] = useState<string>('');
  const [preco, setPreco] = useState<number>();

  const [produtos, setProdutos] = useState<Produto[]>([])

  const { itensPedido, limparItens } = useItensPedido()

  const carregarCardapio = async () => {
    // console.log('renderizando cardapio ')
    await cardapioFirestore.recuperarCardapio().then((dados) => {
      if (dados != undefined) {
        setProdutos(dados)
      }
    })
  }

  const cadastrarProduto = async () => {
    try {
      await cardapioFirestore.registrarProduto({
        descricao: descricao,
        preco: Number(preco)
      })
      Alert.alert('Sucesso', 'Produto cadastrado no cardápio com sucesso!', [
        {
          text: 'Ok',
          onPress: () => {
            setDescricao('')
            setPreco(0)
          }
        }
      ])
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.areaForm}>
        <Text category="h6">Adicionar novo produto ao cardápio</Text>
        <Input
          label={'Descrição'}
          status="primary"
          accessoryRight={<MaterialIcons name="notes" size={23} color="#4B00CC" />}
          value={descricao}
          onChangeText={nextValue => setDescricao(nextValue)}
        />
        <Input
          label={'Preço'}
          placeholder=''
          status="primary"
          accessoryRight={<MaterialIcons name="attach-money" size={23} color="#4B00CC" />}
          // value={preco?.toString()}
          keyboardType="decimal-pad"
          onChangeText={(text) => {
            // troca vírgula por ponto para garantir compatibilidade
            const valor = text.replace(',', '.');
            // console.log(parseFloat(valor))
            setPreco(parseFloat(valor))
          }}
        />
        <Button
          size="small"
          onPress={() => {
            cadastrarProduto();
          }}
        >Cadastrar</Button>

      </View>


      <View style={styles.areaExclusao}>
        <Text category="h6">Excluir produto do cardápio</Text>
        <Button
          status="warning"
          appearance="outline"
          onPress={() => {
            carregarCardapio()
          }}
        >Mostrar cardápio</Button>
      </View>
      <View style={styles.listaProdutos}>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id_produto ?? item.descricao}
          renderItem={({ item }) => (
            <ItemCardapioEditar
              objeto={item}
            />
          )}
          numColumns={1}
          contentContainerStyle={{ gap: 3 }}
        />
        <Button status="danger" size="small"
          onPress={async () => {
            itensPedido.map(async (item) => {
              await cardapioFirestore.excluirProduto(item.id_produto ?? "");
              console.log(item.descricao, ' excluido com sucesso')
            })
            limparItens()
            await carregarCardapio();
          }}
        >Excluir produtos selecionados</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
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
  listaProdutos: {
    height: '40%',
    gap: 5
  }
});