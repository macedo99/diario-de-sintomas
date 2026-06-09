import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/login/Login';
import { Cadastro } from '../screens/cadastro/Cadastro';
import { Home } from '../screens/home/Home';
import { NovoRegistro } from '../screens/novoRegistro/NovoRegistro';
import { Relatorio } from '../screens/relatorio/Relatorio';
import { Perfil } from '../screens/perfil/Perfil';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NovoRegistro" component={NovoRegistro} />
        <Stack.Screen name="Relatorio" component={Relatorio} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}