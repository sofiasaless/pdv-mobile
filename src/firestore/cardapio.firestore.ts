import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../config/firebase.config";
import { Produto } from "../types/produto.type";

const nomeColecao = 'cardapio'

export const cardapioFirestore = {
  recuperarCardapio: async () => {
    try {
      const resultadosQuery = await getDocs(collection(firestore, nomeColecao));
      let listaMesas: any[] = []

      resultadosQuery.forEach((doc) => {
        listaMesas.push({
          id_produto: doc.id,
          ...doc.data()
        })
      })

      return listaMesas as Produto[]
    } catch (error) {
      console.log('erro ao recuperar produtos: ', error)
    }
  },

  registrarProduto: async (produto: Produto) => {
    try {
      const docRef = await addDoc(collection(firestore, nomeColecao), produto);
      console.log("produto criado com o id: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.log('erro ao adicionar uma mesa ', e)
    }

  },

  excluirProduto: async (id_produto: string) => {
    try {
      const docRef = doc(firestore, nomeColecao, id_produto);
      await deleteDoc(docRef);
      console.log('produto excluido com sucesso')
    } catch (error) {
      console.log('erro ao excluir produto do cardapio ', error)
    }
  }

}