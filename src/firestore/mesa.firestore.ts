import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../config/firebase.config";
import { Mesa } from "../types/mesa.type";

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
      
  }

}