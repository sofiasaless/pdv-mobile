// src/components/AuthGuard.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const ProtectedPageLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const usuarioJson = await AsyncStorage.getItem("usuario");
        if (!usuarioJson) {
          // Usuário não logado → manda para login
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

    verificarUsuario();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  return <>{children}</>;
};
