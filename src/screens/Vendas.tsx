import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Produto } from "../types/produto.type";
import { cardapioFirestore } from "../firestore/cardapio.firestore";
import { ItemCardapioEditar } from "../components/ItemCardapioEditar";
import { useItensPedido } from "../context/ItensPedidoContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function Vendas() {



  return (
    <View style={styles.container}>

      <View style={styles.areaForm}>
        <Text category="h6">Vendas diárias e periódicas</Text>
        <Button
          size="small"
          status="success"
          appearance="outline"
        >Vendas de hoje</Button>
      </View>


      <View style={styles.listaVendas}>
        {/* <FlatList
          data={produtos}
          keyExtractor={(item) => item.id_produto ?? item.descricao}
          renderItem={({ item }) => (
            <ItemCardapioEditar
              objeto={item}
            />
          )}
          numColumns={1}
          contentContainerStyle={{ gap: 3 }}
        /> */}

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
  listaVendas: {
    height: '40%',
    gap: 5
  }
});