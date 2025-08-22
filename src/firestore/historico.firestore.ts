import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, endBefore, getCountFromServer, getDoc, getDocs, limit, limitToLast, orderBy, query, QueryDocumentSnapshot, startAfter, Timestamp, updateDoc, where } from "firebase/firestore";
import { firestore } from "../config/firebase.config";
import { HistoricoMesa } from "../types/historicoMesa.type";

const nomeColecao = 'historicoMesas'

export const historicoFirestore = {
  registrarHistorico: async (historico: HistoricoMesa) => {
    try {
      const docRef = await addDoc(collection(firestore, nomeColecao), historico);
      console.log("historico criadio com o id: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.log('erro ao adicionar um historico ', e)
    }
  },

  recuperarHistorico: async () => {
    try {
      const resultadosQuery = await getDocs(
        query(
          collection(firestore, nomeColecao),
          orderBy('numeracao', 'desc')
        )
      );
      let listaMesas: any[] = []

      resultadosQuery.forEach((doc) => {
        listaMesas.push({
          id_historico: doc.id,
          ...doc.data()
        })
      })

      return listaMesas as HistoricoMesa[]
    } catch (error) {
      console.log('erro ao recuperar produtos: ', error)
    }
  },

  recuperarHistoricoPorId: async (id_historico: string) => {
    try {
      const historicoRef = doc(firestore, nomeColecao, id_historico)
      const historicoDoc = await getDoc(historicoRef);

      let historicoObj = {
        id_historico: historicoDoc.id,
        ...historicoDoc.data()
      }

      return historicoObj as HistoricoMesa

    } catch (error) {
      console.log('ocorreu um erro ao buscar a mesa pelo id ', error)
    }
  },

  recuperarHistoricoPorPaginacao: async (
    limite: number,
    cursor?: {
      tipo: "proxima" | "anterior";
      doc: QueryDocumentSnapshot<DocumentData>;
    }
  ): Promise<{ dados: HistoricoMesa[]; primeiroDoc: any; ultimoDoc: any }> => {
    try {
      let q;

      if (cursor?.tipo === "proxima") {
        q = query(
          collection(firestore, nomeColecao),
          orderBy("encerradoEm", "desc"),
          startAfter(cursor.doc),
          limit(limite)
        );
      } else if (cursor?.tipo === "anterior") {
        q = query(
          collection(firestore, nomeColecao),
          orderBy("encerradoEm", "desc"),
          endBefore(cursor.doc),
          limitToLast(limite)
        );
      } else {
        q = query(
          collection(firestore, nomeColecao),
          orderBy("encerradoEm", "desc"),
          limit(limite)
        );
      }

      const snapshot = await getDocs(q);

      const listaMesas: HistoricoMesa[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id_historico: doc.id,
          numeracao: data.numeracao,
          encerradoEm: data.encerradoEm,
          idMesa: data.idMesa,
          pedidos: data.pedidos,
          mesa_reference: data.mesa_reference
        };
      });

      const primeiro = snapshot.docs[0] || null;
      const ultimo = snapshot.docs[snapshot.docs.length - 1] || null;

      return {
        dados: listaMesas,
        primeiroDoc: primeiro,
        ultimoDoc: ultimo
      };
    } catch (error) {
      console.log("Erro ao recuperar histórico:", error);
      return { dados: [], primeiroDoc: null, ultimoDoc: null };
    }
  },

  recuperarHistoricoPorData: async (data: Date) => {
    try {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const q = query(
        collection(firestore, nomeColecao),
        where("encerradoEm", ">=", hoje)
      );

      const snapshot = await getDocs(q);

      const lista: HistoricoMesa[] = snapshot.docs.map(doc => ({
        id_historico: doc.id,
        ...doc.data()
      })) as HistoricoMesa[];

      return lista;
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      return [];
    }
  },

  recuperarHistoricoPorPeriodo: async (dataInicial: Date, dataFinal: Date) => {
    try {
      // Garantir que são objetos Date válidos
      const inicio = new Date(dataInicial);
      const fim = new Date(dataFinal);

      // console.log('datas que chegaram ao função do firestore')
      // console.log(inicio)
      // console.log(fim)

      // Query no Firestore com intervalo de datas
      const q = query(
        collection(firestore, nomeColecao),
        where("encerradoEm", ">=", inicio),
        where("encerradoEm", "<=", fim)
      );

      const snapshot = await getDocs(q);

      const lista: HistoricoMesa[] = snapshot.docs.map(doc => ({
        id_historico: doc.id,
        ...doc.data()
      })) as HistoricoMesa[];

      return lista;
    } catch (error) {
      console.error("Erro ao buscar histórico por período:", error);
      return [];
    }
  }

}