import { Card, Layout, Text, useTheme } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface MesaProps {
  status: 'ocupada' | 'disponivel' | 'aguardando'
}

export const Mesa: React.FC<MesaProps> = ({ status }) => {
  const theme = useTheme();

  return (
    <Card
      style={[styles.card, {
        backgroundColor: (status === 'disponivel') ? 'white' : (status === 'ocupada') ? theme['color-success-600'] : theme['color-danger-400']
      }]}
    >
      <View style={styles.txtLabel}>
        {
          (status === 'disponivel') ?
            <MaterialIcons name="done" size={15} color={theme['color-primary-600']} />
            :
            (status === 'ocupada')
              ?
              <MaterialIcons name="circle" size={15} color={theme['color-success-900']} />
              :
              <MaterialIcons name="error" size={15} color={theme['color-danger-900']} />
        }
        <Text category="c1"
          style={{
            color: (status === 'disponivel') ? theme['color-primary-900'] : (status === 'ocupada') ? theme['color-success-900'] : theme['color-danger-900']
          }}
        >
          {status.toUpperCase()}
        </Text>
      </View>
      <Text style={{ textAlign: 'center' }} category="h4">MESA 01</Text>

    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    paddingVertical: 10
  },
  txtLabel: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
  }
})