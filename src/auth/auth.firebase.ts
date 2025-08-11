import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { UsuarioLogin } from "../types/usuario.type";
import { EMAIL_GERENTE, EMAIL_GARCOM } from "@env"

const colecaoAuth = 'usuarios'

export const authFirebase = {
  loginUsuario: async (usuario: UsuarioLogin) => {
    try {
      let credenciais
      if (usuario.tipo === 'GARCOM') {
        credenciais = await signInWithEmailAndPassword(auth, EMAIL_GARCOM, usuario.senha);
      } else {
        credenciais = await signInWithEmailAndPassword(auth, EMAIL_GERENTE, usuario.senha);
      }

      console.log("Usuário logado:", credenciais.user);
      return true
    } catch (erro: any) {
      console.error("Erro ao fazer login:", erro.message);
      return false
    }
  },

  logoutUsuario: async () => {
    try {
      await signOut(auth);
      console.log("Usuário deslogado");
    } catch (error) {
      console.log('erro ao fazer logout ', error)
    }
  }


}