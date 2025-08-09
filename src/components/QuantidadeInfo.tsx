import { Card, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";

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
      <Text category="label" status={tema}>{quantidade} {descricao.toUpperCase()}</Text>
    </Layout>
  );
}