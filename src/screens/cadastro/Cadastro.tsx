import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

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
    const apenasNumeros = text.replace(/\D/g, '');
    let dataFormatada = apenasNumeros;
    if (apenasNumeros.length > 2) {
      dataFormatada = `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
    }
    if (apenasNumeros.length > 4) {
      dataFormatada = `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}/${apenasNumeros.slice(4, 8)}`;
    }
    setDataNasc(dataFormatada);
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

          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: joao.silva" 
            autoCapitalize="none" 
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Crie uma senha forte" 
              secureTextEntry={!mostrarSenha} 
              value={senha}
              onChangeText={setSenha}
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

          <Text style={styles.label}>Nome Completo</Text>
          <TextInput 
            style={styles.input} 
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

          <View style={styles.row}>
            <View style={styles.flexInput}>
              <Text style={styles.label}>Data Nasc.</Text>
              <TextInput 
                style={styles.input} 
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
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: 75.5" 
                keyboardType="numeric" 
                value={peso}
                onChangeText={setPeso}
              />
            </View>
            <View style={styles.flexInput}>
              <Text style={styles.label}>Altura (cm)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: 175" 
                keyboardType="numeric" 
                value={altura}
                onChangeText={setAltura}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Já possui conta? Volte para o Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}