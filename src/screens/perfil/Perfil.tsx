import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { MenuSuperior } from '../../componentes/MenuSuperior/MenuSuperior';
import { InputPadrao } from '../../componentes/InputPadrao/InputPadrao';
import { BotaoPadrao } from '../../componentes/BotaoPadrao/BotaoPadrao';

export function Perfil({ navigation }: any) {
  const [menuVisivel, setMenuVisivel] = useState(false);
  
  const [nome, setNome] = useState('João da Silva');
  const [dataNascimento, setDataNascimento] = useState('15/08/1990');
  const [peso, setPeso] = useState('75');
  const [altura, setAltura] = useState('175');

  const [temEnxaqueca, setTemEnxaqueca] = useState(true);
  const [temAlergia, setTemAlergia] = useState(false);
  const [temPressao, setTemPressao] = useState(true);
  const [temDiabetes, setTemDiabetes] = useState(false);

  const handleMascaraData = (texto: string) => {
    let num = texto.replace(/\D/g, '');

    if (num.length > 2) {
      num = num.replace(/^(\d{2})(\d)/, '$1/$2');
    }
    if (num.length > 5) {
      num = num.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }

    setDataNascimento(num.substring(0, 10));
  };

  const handleSalvarPerfil = () => {
    const perfilAtualizado = {
      dadosPessoais: { nome, dataNascimento, peso, altura },
      comorbidades: {
        enxaqueca: temEnxaqueca,
        alergias: temAlergia,
        pressaoArterial: temPressao,
        diabetes: temDiabetes
      }
    };
    
    console.log('Salvando Perfil no Backend:', perfilAtualizado);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Feather name="chevron-left" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
            <TouchableOpacity onPress={() => setMenuVisivel(true)} activeOpacity={0.7}>
              <Feather name="menu" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
          
          <InputPadrao 
            label="Nome Completo" 
            value={nome} 
            onChangeText={setNome} 
            placeholder="Digite seu nome" 
          />

          <InputPadrao 
            label="Data de Nascimento" 
            value={dataNascimento} 
            onChangeText={handleMascaraData}
            placeholder="DD/MM/AAAA" 
            keyboardType="numeric" 
            maxLength={10}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <InputPadrao 
                label="Peso (kg)" 
                value={peso} 
                onChangeText={setPeso} 
                placeholder="Ex: 70" 
                keyboardType="numeric" 
                maxLength={5} 
              />
            </View>
            <View style={styles.halfInput}>
              <InputPadrao 
                label="Altura (cm)" 
                value={altura} 
                onChangeText={setAltura} 
                placeholder="Ex: 170" 
                keyboardType="numeric" 
                maxLength={3} 
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Condições de Saúde</Text>
          <Text style={styles.label}>Selecione para acompanhar no Diário:</Text>

          <TouchableOpacity style={styles.checkboxCard} activeOpacity={0.7} onPress={() => setTemEnxaqueca(!temEnxaqueca)}>
            <View style={[styles.checkbox, temEnxaqueca && styles.checkboxSelected]}>
              {temEnxaqueca && <Feather name="check" size={16} color="#FFF" />}
            </View>
            <Text style={styles.cardTitle}>Enxaqueca</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxCard} activeOpacity={0.7} onPress={() => setTemAlergia(!temAlergia)}>
            <View style={[styles.checkbox, temAlergia && styles.checkboxSelected]}>
              {temAlergia && <Feather name="check" size={16} color="#FFF" />}
            </View>
            <Text style={styles.cardTitle}>Alergias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxCard} activeOpacity={0.7} onPress={() => setTemPressao(!temPressao)}>
            <View style={[styles.checkbox, temPressao && styles.checkboxSelected]}>
              {temPressao && <Feather name="check" size={16} color="#FFF" />}
            </View>
            <Text style={styles.cardTitle}>Pressão Arterial</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxCard} activeOpacity={0.7} onPress={() => setTemDiabetes(!temDiabetes)}>
            <View style={[styles.checkbox, temDiabetes && styles.checkboxSelected]}>
              {temDiabetes && <Feather name="check" size={16} color="#FFF" />}
            </View>
            <Text style={styles.cardTitle}>Diabetes</Text>
          </TouchableOpacity>

          <BotaoPadrao 
            texto="Salvar Alterações" 
            onPress={handleSalvarPerfil} 
            style={{ marginTop: 20 }}
          />

        </ScrollView>
      </KeyboardAvoidingView>

      <MenuSuperior visivel={menuVisivel} onClose={() => setMenuVisivel(false)} navigation={navigation} />
    </SafeAreaView>
  );
}