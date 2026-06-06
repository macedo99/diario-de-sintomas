import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './styles'; // Importando o estilo específico

export function Login({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Logo Do Aplicativo</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="Digite seu usuário" autoCapitalize="none" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}