import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { styles } from './styles';

export function Cadastro({ navigation }: any) {
  // Estados para simular as checkboxes funcionando
  const [enxaqueca, setEnxaqueca] = useState(false);
  const [alergias, setAlergias] = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [diabetes, setDiabetes] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.title}>Criar Conta</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="Ex: joao.silva" autoCapitalize="none" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Crie uma senha forte" secureTextEntry />

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} placeholder="Digite seu nome" />

        {/* Seção de Comorbidades */}
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

        {/* Seção de Dados Biométricos */}
        <View style={styles.row}>
          <View style={styles.flexInput}>
            <Text style={styles.label}>Data Nasc.</Text>
            <TextInput style={styles.input} placeholder="DD/MM/AAAA" keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.flexInput}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput style={styles.input} placeholder="Ex: 75.5" keyboardType="numeric" />
          </View>
          <View style={styles.flexInput}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput style={styles.input} placeholder="Ex: 175" keyboardType="numeric" />
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Já possui conta? Volte para o Login</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}