import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";

export function Routes() {
  const { user } = useAuth();

  return user ? <UserStack /> : <AuthStack />;
}
