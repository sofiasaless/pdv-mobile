import { createContext, useContext, useState, type ReactNode } from "react";
import { ItemPedido } from "../types/itemPedido.type";

interface ItensPedidoContextType {
  itensPedido: ItemPedido[],
  adicionarItemPedido: (item: ItemPedido) => void,
  removerItemPedido: (id_produto: string) => void,
  atualizarQuantidadeItem?: (item: ItemPedido, acao: 'MENOS' | 'MAIS') => void,
  limparItens: () => void,
}

const ItensPedidoContext = createContext<ItensPedidoContextType | undefined>(undefined);

export const ItensPedidoProvider = ({ children }: { children: ReactNode }) => {
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([])
  
  const adicionarItemPedido = (item: ItemPedido) => {
    setItensPedido(prev => [...prev, item]);
  }

  const removerItemPedido = (id_produto: string) => {
    setItensPedido((prev) => prev.filter((i) => i.id_produto !== id_produto));
  };

  const limparItens = () => {
    setItensPedido([]);
  };

  const atualizarQuantidadeItem = (item: ItemPedido, acao: 'MENOS' | 'MAIS') => {
    setItensPedido((prev) =>
      prev.map((it) => {
        if (it.id === item.id) {
          return {
            ...it,
            quantidade:
              acao === 'MAIS'
                ? it.quantidade + 1
                : it.quantidade > 0
                  ? it.quantidade - 1
                  : 0,
          };
        }
        return it;
      })
    );
  };

  return (
    <ItensPedidoContext.Provider value={{ itensPedido, adicionarItemPedido, removerItemPedido, limparItens, atualizarQuantidadeItem }}>
      {children}
    </ItensPedidoContext.Provider>
  );

}

export const useItensPedido = () => {
  const context = useContext(ItensPedidoContext);
  if (!context) {
    throw new Error("useItensPedido deve ser usado dentro de um ItensPedidoProvider");
  }
  return context;
};