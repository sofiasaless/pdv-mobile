// src/components/AuthGuard.tsx
import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/StackRoutes";

export const ProtectedPageLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  
  const verificarUsuario = async () => {
    try {
      const usuarioJson = await AsyncStorage.getItem("usuario");
      if (!usuarioJson) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" as never }],
        });
      }
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" as never }],
      });
    } finally {
      setLoading(false);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      verificarUsuario();
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  return <>{children}</>;
};
