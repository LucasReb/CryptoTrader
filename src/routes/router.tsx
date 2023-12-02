import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { LoadingScreen } from "../screens/Loading";

export function Routes() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aqui você pode adicionar lógica para verificar se a autenticação está completa
    // Isso pode incluir uma chamada assíncrona, como uma verificação de autenticação no servidor

    // Simulando uma chamada assíncrona de verificação de autenticação
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Defina o tempo de espera desejado ou remova esta linha se não precisar de um atraso simulado
  }, []);

  if (isLoading) {
    // Mostra uma tela de carregamento enquantoj verifica a autenticação
    return <LoadingScreen />;
  }

  return user ? <UserStack /> : <AuthStack />;
}
