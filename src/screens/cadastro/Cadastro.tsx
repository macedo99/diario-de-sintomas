import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

export function Cadastro({ navigation }: any) {
  const [nome, setNome]               = useState('');
  const [username, setUsername]       = useState('');
  const [senha, setSenha]             = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dataNasc, setDataNasc]       = useState('');
  const [peso, setPeso]               = useState('');
  const [altura, setAltura]           = useState('');

  const [enxaqueca, setEnxaqueca]     = useState(false);
  const [alergias, setAlergias]       = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [diabetes, setDiabetes]       = useState(false);

  const [carregando, setCarregando]   = useState(false);

  
  const { register } = useAuth();
  const { toast, show, hide } = useToast();

  const handleDataNascChange = (text: string) => {
    let num = text.replace(/\D/g, '');
    if (num.length > 2) num = num.replace(/^(\d{2})(\d)/, '$1/$2');
    if (num.length > 5) num = num.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    setDataNasc(num.substring(0, 10));
  };

  function validar(): string | null {
    if (!nome.trim())     return 'Informe seu nome completo.';
    if (!username.trim()) return 'Escolha um username.';
    if (username.trim().length < 3) return 'Username deve ter pelo menos 3 caracteres.';
    if (!senha)           return 'Crie uma senha.';
    if (senha.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    return null;
  }

  async function handleCadastro() {
    const erro = validar();
    if (erro) { show(erro, 'error'); return; }

    setCarregando(true);
    try {
      await register(
        nome.trim(),
        username.trim(),
        senha,
        {
          dataNasc:     dataNasc || undefined,
          pesoKg:       peso   ? parseFloat(peso)   : undefined,
          alturaCm:     altura ? parseFloat(altura) : undefined,
          comorbidades: { enxaqueca, alergias, hipertensao, diabetes },
        },
      );
      show('Conta criada com sucesso! Faça login para continuar.', 'success');
      setTimeout(() => navigation.goBack(), 1500);
    } catch (err) {
      const apiErr = err as ApiError;
      show(apiErr.message ?? 'Erro ao criar conta. Tente novamente.', 'error');
    } finally {
      setCarregando(false);
    }
  }

  
  function Checkbox({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onToggle}
        activeOpacity={0.7}
        disabled={carregando}
      >
        <View style={[styles.checkbox, value && styles.checkboxSelected]} />
        <Text style={styles.checkboxText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onHide={hide} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Criar Conta</Text>

          <InputPadrao
            label="Username"
            placeholder="Ex: joao.silva"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
            editable={!carregando}
          />

          <View style={styles.passwordContainer}>
            <InputPadrao
              label="Senha"
              placeholder="Crie uma senha forte"
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
              <Feather name={mostrarSenha ? 'eye' : 'eye-off'} size={20} color="#555" />
            </TouchableOpacity>
          </View>

          <InputPadrao
            label="Nome Completo"
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
            editable={!carregando}
          />

          <Text style={styles.sectionTitle}>Selecione suas condições:</Text>
          <Checkbox label="Enxaqueca"   value={enxaqueca}   onToggle={() => setEnxaqueca(v => !v)} />
          <Checkbox label="Alergias"    value={alergias}    onToggle={() => setAlergias(v => !v)} />
          <Checkbox label="Hipertensão" value={hipertensao} onToggle={() => setHipertensao(v => !v)} />
          <Checkbox label="Diabetes"    value={diabetes}    onToggle={() => setDiabetes(v => !v)} />

          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <InputPadrao
                label="Data Nasc."
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
                value={dataNasc}
                onChangeText={handleDataNascChange}
                editable={!carregando}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flexInput}>
              <InputPadrao
                label="Peso (kg)"
                placeholder="Ex: 75.5"
                keyboardType="numeric"
                maxLength={5}
                value={peso}
                onChangeText={setPeso}
                editable={!carregando}
              />
            </View>
            <View style={styles.flexInput}>
              <InputPadrao
                label="Altura (cm)"
                placeholder="Ex: 175"
                keyboardType="numeric"
                maxLength={3}
                value={altura}
                onChangeText={setAltura}
                editable={!carregando}
              />
            </View>
          </View>

          <BotaoPadrao
            texto={carregando ? '' : 'Cadastrar'}
            onPress={handleCadastro}
            style={{ marginBottom: 15 }}
            disabled={carregando}
          >
            {carregando && <ActivityIndicator color="#fff" />}
          </BotaoPadrao>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            disabled={carregando}
          >
            <Text style={styles.backButtonText}>Já possui conta? Volte para o Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
