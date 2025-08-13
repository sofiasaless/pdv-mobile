import { Card, Layout, useTheme } from "@ui-kitten/components";
import React from "react";
import { Text } from "react-native";

interface QuantidadeInfoProps {
  tema: 'danger' | 'success' | 'primary',
  quantidade: number,
  descricao: 'livres' | 'ocupadas' | 'aguardando'
}

export const QuantidadeInfo: React.FC<QuantidadeInfoProps> = ({ tema, quantidade, descricao }) => {
  const theme = useTheme();

  return (
    <Layout
      style={{
        borderRadius: 5,
        padding: 8,
        backgroundColor: (descricao === 'livres') ? theme['color-primary-transparent-200'] : (descricao === 'ocupadas') ? theme['color-success-transparent-200'] : theme['color-danger-transparent-200']
      }}
    >
      <Text
        style={{
          color: (descricao === 'livres') ? theme['color-primary-600'] : (descricao === 'ocupadas') ? theme['color-success-600'] : theme['color-danger-600']
        }}
      >{quantidade} {descricao.toUpperCase()}</Text>
    </Layout>
  );
}