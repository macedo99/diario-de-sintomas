import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { InputPadrao } from '../../componentes/InputPadrao/InputPadrao';
import { BotaoPadrao } from '../../componentes/BotaoPadrao/BotaoPadrao';
import { Toast } from '../../componentes/Toast/Toast';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { ApiError } from '../../services/Api';

export function Login({ navigation }: any) {
  const { login } = useAuth();
  const { toast, show, hide } = useToast();

  const [username, setUsername]         = useState('');
  const [senha, setSenha]               = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando]     = useState(false);

  async function handleLogin() {
    if (!username.trim() || !senha) {
      show('Preencha o usuário e a senha.', 'error');
      return;
    }

    setCarregando(true);
    try {
      await login(username.trim(), senha);
    } catch (err) {
      const apiErr = err as ApiError;
      show(apiErr.message ?? 'Não foi possível conectar ao servidor.', 'error');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hide}
      />

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
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
              editable={!carregando}
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
                editable={!carregando}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setMostrarSenha(v => !v)}
                activeOpacity={0.7}
                disabled={carregando}
              >
                <Feather
                  name={mostrarSenha ? 'eye' : 'eye-off'}
                  size={20}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <BotaoPadrao
              texto={carregando ? '' : 'Entrar'}
              onPress={handleLogin}
              style={{ marginTop: 10 }}
              disabled={carregando}
            >
              {carregando && <ActivityIndicator color="#fff" />}
            </BotaoPadrao>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cadastro')}
              disabled={carregando}
            >
              <Text style={styles.linkText}>Não possui conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
