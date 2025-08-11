import { addDoc, arrayUnion, collection, doc, getCountFromServer, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../config/firebase.config";
import { Mesa, StatusMesa } from "../types/mesa.type";
import { ItemPedido } from "../types/itemPedido.type";

const nomeColecao = 'mesas'

export const mesaFirestore = {
  recuperarMesas: async () => {
    try {
      const resultadosQuery = await getDocs(
        query(
          collection(firestore, nomeColecao),
          orderBy('numeracao', 'asc')
        )
      );
      let listaMesas: any[] = []

      resultadosQuery.forEach((doc) => {
        listaMesas.push({
          id_mesa: doc.id,
          ...doc.data()
        })
      })

      return listaMesas as Mesa[]
    } catch (error) {
      console.log('erro ao recuperar produtos: ', error)
    }
  },

  recuperarMesaPorId: async (id_mesa: string) => {
    try {
      const mesaRef = doc(firestore, nomeColecao, id_mesa)
      const mesaDoc = await getDoc(mesaRef);

      let mesaObj = {
        id_mesa: mesaDoc.id,
        ...mesaDoc.data()
      }

      return mesaObj as Mesa

    } catch (error) {
      console.log('ocorreu um erro ao buscar a mesa pelo id ', error)
    }
  },

  registrarMesa: async (mesa: Mesa) => {
    try {
      const docRef = await addDoc(collection(firestore, nomeColecao), mesa);
      console.log("mesa criada com o id: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.log('erro ao adicionar uma mesa ', e)
    }

  },

  adicionarPedidos: async (itensPedido: ItemPedido[], id_mesa: string) => {
    try {
      const mesaRef = doc(firestore, nomeColecao, id_mesa);

      await updateDoc(mesaRef, {
        pedidos: arrayUnion(...itensPedido),
        status: 'ocupada',
      });

      console.log('pedidos atualizados com sucesso!')

    } catch (error) {
      console.log('erro ao adicionar no pedido ', error)
    }
  },

  contarMesas: async () => {
    try {
      const mesaRef = collection(firestore, nomeColecao);
      const queryConsultaLIVRES = query(mesaRef, where("status", "==", 'disponivel'));
      const queryConsultaOCUPADAS = query(mesaRef, where("status", "==", 'ocupada'));
      const queryConsultaBLOQ = query(mesaRef, where("status", "==", 'bloqueada'));

      let qtdOcupacoes: number[] = []
      qtdOcupacoes.push((await getCountFromServer(queryConsultaLIVRES)).data().count)
      qtdOcupacoes.push((await getCountFromServer(queryConsultaOCUPADAS)).data().count)
      qtdOcupacoes.push((await getCountFromServer(queryConsultaBLOQ)).data().count)

      return qtdOcupacoes
    } catch (error) {
      console.log('erro ao contar as mesas')
    }
  }

}