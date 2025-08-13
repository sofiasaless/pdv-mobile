import { StyleSheet, View } from "react-native";
import { CardHistorico } from "../components/CardHistorico";
import { Button, ButtonGroup, Spinner } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { HistoricoMesa } from "../types/historicoMesa.type";
import { historicoFirestore } from "../firestore/historico.firestore";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface CursorPaginacao {
  primeiroDoc: QueryDocumentSnapshot<DocumentData> | null;
  ultimoDoc: QueryDocumentSnapshot<DocumentData> | null;
}

export default function Historico() {
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [dados, setDados] = useState<HistoricoMesa[]>([]);
  const [cursores, setCursores] = useState<CursorPaginacao[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const limite = 4;

  async function carregarPagina(tipo?: "proxima" | "anterior") {
    setLoading(true);

    let cursor:
      | { tipo: "proxima" | "anterior"; doc: QueryDocumentSnapshot<DocumentData> }
      | undefined;

    if (tipo === "proxima" && cursores[paginaAtual - 1]?.ultimoDoc) {
      cursor = { tipo: "proxima", doc: cursores[paginaAtual - 1].ultimoDoc! };
    } else if (tipo === "anterior" && cursores[paginaAtual - 1]?.primeiroDoc) {
      cursor = { tipo: "anterior", doc: cursores[paginaAtual - 1].primeiroDoc! };
    }

    const { dados, primeiroDoc, ultimoDoc } =
      await historicoFirestore.recuperarHistoricoPorPaginacao(limite, cursor);

    setDados(dados);

    if (tipo === "proxima") {
      setCursores((prev) => [...prev, { primeiroDoc, ultimoDoc }]);
      setPaginaAtual((prev) => prev + 1);
    } else if (tipo === "anterior") {
      setPaginaAtual((prev) => prev - 1);
    } else {
      setCursores([{ primeiroDoc, ultimoDoc }]);
      setPaginaAtual(1);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarPagina();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        dados.map((item) => (
          <CardHistorico
            key={item.id_historico}
            objeto={item}
          />
        ))
      )}

      <View style={styles.areaPaginacao}>
        <ButtonGroup status="info" appearance="outline">
          <Button
            disabled={paginaAtual === 1}
            onPress={() => carregarPagina("anterior")}
          >
            <AntDesign name="caretleft" size={20} color="black" />
          </Button>

          <Button>{paginaAtual}</Button>

          <Button
            onPress={() => carregarPagina("proxima")}
            disabled={dados.length < limite}
          >
            <AntDesign name="caretright" size={20} color="black" />
          </Button>
        </ButtonGroup>
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
  areaPaginacao: {
    alignItems: "center"
  }
});