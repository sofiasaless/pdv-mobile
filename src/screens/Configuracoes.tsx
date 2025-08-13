import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Tab, TabView, Text, useTheme } from '@ui-kitten/components';
import Historico from './Historico';
import Produtos from './Produtos';
import Vendas from './Vendas';

export const Configuracoes = (): React.ReactElement => {

  const theme = useTheme()

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab title='HISTÓRICO'>
        <Layout style={[styles.tabContainer, { backgroundColor: theme['color-basic-300'] }]}>
          <Historico />
        </Layout>
      </Tab>
      <Tab title='PRODUTOS'>
        <Layout style={[styles.tabContainer, { backgroundColor: theme['color-basic-300'] }]}>
          <Produtos />
        </Layout>
      </Tab>
      <Tab title='VENDAS'>
        <Layout style={[styles.tabContainer, { backgroundColor: theme['color-basic-300'] }]}>
          <Vendas />
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
});