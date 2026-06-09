import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { InputPadrao } from '../../componentes/InputPadrao/InputPadrao';
import { BotaoPadrao } from '../../componentes/BotaoPadrao/BotaoPadrao';

export function Cadastro({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const [enxaqueca, setEnxaqueca] = useState(false);
  const [alergias, setAlergias] = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [diabetes, setDiabetes] = useState(false);

  const handleDataNascChange = (text: string) => {
    let num = text.replace(/\D/g, '');

    if (num.length > 2) {
      num = num.replace(/^(\d{2})(\d)/, '$1/$2');
    }
    if (num.length > 5) {
      num = num.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }

    setDataNasc(num.substring(0, 10));
  };

  const handleCadastro = () => {
    const dadosUsuario = {
      username, senha, nome, dataNasc, peso, altura,
      comorbidades: { enxaqueca, alergias, hipertensao, diabetes }
    };
    console.log('Dados prontos para o banco:', dadosUsuario);
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
          <Text style={styles.title}>Criar Conta</Text>

          <InputPadrao 
            label="Username"
            placeholder="Ex: joao.silva" 
            autoCapitalize="none" 
            value={username}
            onChangeText={setUsername}
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

          <InputPadrao 
            label="Nome Completo"
            placeholder="Digite seu nome" 
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.sectionTitle}>Selecione suas condições:</Text>
          
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setEnxaqueca(!enxaqueca)} activeOpacity={0.7}>
            <View style={[styles.checkbox, enxaqueca && styles.checkboxSelected]} />
            <Text style={styles.checkboxText}>Enxaqueca</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAlergias(!alergias)} activeOpacity={0.7}>
            <View style={[styles.checkbox, alergias && styles.checkboxSelected]} />
            <Text style={styles.checkboxText}>Alergias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setHipertensao(!hipertensao)} activeOpacity={0.7}>
            <View style={[styles.checkbox, hipertensao && styles.checkboxSelected]} />
            <Text style={styles.checkboxText}>Hipertensão</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setDiabetes(!diabetes)} activeOpacity={0.7}>
            <View style={[styles.checkbox, diabetes && styles.checkboxSelected]} />
            <Text style={styles.checkboxText}>Diabetes</Text>
          </TouchableOpacity>

          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <InputPadrao 
                label="Data Nasc."
                placeholder="DD/MM/AAAA" 
                keyboardType="numeric" 
                maxLength={10} 
                value={dataNasc}
                onChangeText={handleDataNascChange} 
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
              />
            </View>
          </View>

          <BotaoPadrao 
            texto="Cadastrar"
            onPress={handleCadastro}
            style={{ marginBottom: 15 }}
          />

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Já possui conta? Volte para o Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}