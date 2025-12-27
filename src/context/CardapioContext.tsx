import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Alert } from "react-native";
import { cardapioFirestore } from "../firestore/cardapio.firestore";
import { Produto } from "../types/produto.type";

interface CardapioContextType {
  cardapio: Produto[] | undefined;
  carregando: boolean,
  carregarCardapio: () => Promise<void>
}

const CardapioContext = createContext<CardapioContextType | undefined>(undefined);

export const CardapioProvider = ({ children }: { children: ReactNode }) => {
  const [cardapio, setCardapio] = useState<Produto[] | undefined>(undefined);
  const [carregando, setCarregando] = useState<boolean>(false)

  const carregarCardapio = async () => {
    try {
      // console.info('carregando cardapio...')
      setCarregando(true)
      const dados = await cardapioFirestore.recuperarCardapio();
      setCardapio(dados)
    } catch (error) {
      Alert.alert('Erro ao carregar o cardápio', `${error}`)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <CardapioContext.Provider value={{ cardapio, carregarCardapio, carregando }}
    >
      {children}
    </CardapioContext.Provider>
  );
};

export const useCardapio = () => {
  const context = useContext(CardapioContext);
  if (!context) {
    throw new Error("useCardapio deve ser usado dentro de um CardapioProvider");
  }
  return context;
};
