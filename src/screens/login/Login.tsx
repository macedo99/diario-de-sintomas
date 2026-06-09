import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { InputPadrao } from '../../componentes/InputPadrao/InputPadrao';
import { BotaoPadrao } from '../../componentes/BotaoPadrao/BotaoPadrao';

export function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = () => {
    if (!username || !senha) {
      console.log('Atenção: Campos não preenchidos.');
      return;
    }
    console.log('Tentativa de login:', { username, senha });
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logoImage} 
            />
          </View>

          <View style={styles.formContainer}>
            
            <InputPadrao 
              label="Username"
              placeholder="Digite seu usuário" 
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />

            <View style={styles.passwordContainer}>
              <InputPadrao 
                label="Senha"
                placeholder="Digite sua senha" 
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
                value={senha}
                onChangeText={setSenha}
                style={{ paddingRight: 50 }} 
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setMostrarSenha(!mostrarSenha)}
                activeOpacity={0.7}
              >
                <Feather 
                  name={mostrarSenha ? 'eye' : 'eye-off'} 
                  size={20} 
                  color="#555" 
                />
              </TouchableOpacity>
            </View>

            <BotaoPadrao 
              texto="Entrar" 
              onPress={handleLogin} 
              style={{ marginTop: 10 }}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.linkText}>Não possui conta? Cadastre-se</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}