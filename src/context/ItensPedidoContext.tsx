import React, { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import { ItemPedido } from "../types/itemPedido.type";

interface ItensPedidoContextType {
  itensPedido: ItemPedido[];
  adicionarItemPedido: (item: ItemPedido) => void;
  removerItemPedido: (id_produto?: string) => void;
  atualizarQuantidadeItem: (item: ItemPedido, acao: 'MENOS' | 'MAIS') => void;
  limparItens: () => void;
  atualizarObservacao: (id_produto: string, obs: string) => void;
  isVazio: () => boolean
}

const ItensPedidoContext = createContext<ItensPedidoContextType | undefined>(undefined);

export const ItensPedidoProvider = ({ children }: { children: ReactNode }) => {
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);

  const adicionarItemPedido = useCallback((item: ItemPedido) => {
    setItensPedido(prev => [...prev, item]);
  }, []);

  const removerItemPedido = useCallback((id_produto?: string) => {
    if (!id_produto) return;
    setItensPedido(prev => prev.filter((i) => i.id_produto !== id_produto));
  }, []);

  const limparItens = useCallback(() => {
    setItensPedido([]);
  }, []);

  const atualizarQuantidadeItem = useCallback((item: ItemPedido, acao: 'MENOS' | 'MAIS') => {
    setItensPedido(prev =>
      prev.map(it => (it.id === item.id ? {
        ...it,
        quantidade: acao === 'MAIS' ? it.quantidade + 1 : Math.max(0, it.quantidade - 1)
      } : it))
    );
  }, []);

  const atualizarObservacao = (id_produto: string, obs: string) => {
    setItensPedido((prev) =>
      prev.map((item) =>
        item.id_produto === id_produto ? { ...item, observacao: obs } : item
      )
    );
  };

  const isVazio = () => {
    return (itensPedido.length === 0)
  }

  return (
    <ItensPedidoContext.Provider value={{ itensPedido, adicionarItemPedido, removerItemPedido, limparItens, atualizarQuantidadeItem, atualizarObservacao, isVazio }}
    >
      {children}
    </ItensPedidoContext.Provider>
  );
};

export const useItensPedido = () => {
  const context = useContext(ItensPedidoContext);
  if (!context) {
    throw new Error("useItensPedido deve ser usado dentro de um ItensPedidoProvider");
  }
  return context;
};
