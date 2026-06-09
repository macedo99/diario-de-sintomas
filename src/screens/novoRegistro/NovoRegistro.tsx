import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Modal,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { styles } from './styles';
import { MenuSuperior } from '../../componentes/MenuSuperior/MenuSuperior';
import { InputPadrao } from '../../componentes/InputPadrao/InputPadrao';
import { BotaoPadrao } from '../../componentes/BotaoPadrao/BotaoPadrao';

export function NovoRegistro({ navigation }: any) {
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [modalSeletorVisivel, setModalSeletorVisivel] = useState(false);

  const comorbidadesDoUsuario = ['Enxaqueca', 'Pressão Arterial']; 
  const [condicaoSelecionada, setCondicaoSelecionada] = useState(comorbidadesDoUsuario[0] || '');

  const [notasGerais, setNotasGerais] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [gatilhos, setGatilhos] = useState('');
  const [medicou, setMedicou] = useState(false);
  const [medicamento, setMedicamento] = useState('');
  
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [bpm, setBpm] = useState('');

  const [dadosClima, setDadosClima] = useState<any>(null);
  const [buscandoClima, setBuscandoClima] = useState(true);

  useEffect(() => {
    buscarDadosAmbientais();
  }, []);

  const buscarDadosAmbientais = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setBuscandoClima(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      const API_KEY = 'eacbf04854e240dda8664919240506'; 
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=yes`);
      const data = await response.json();

      setDadosClima({
        temperatura: data.current.temp_c,
        umidadeRelativa: data.current.humidity,
        indiceQualidadeAr: data.current.air_quality ? data.current.air_quality['us-epa-index'] : 'N/D'
      });
      setBuscandoClima(false);
    } catch (error) {
      setBuscandoClima(false);
    }
  };

  const handleSalvar = () => {
    const registroFinal = {
      tipoCondicao: condicaoSelecionada.toLowerCase().replace(' ', '_'),
      dataHora: new Date().toISOString(),
      notasGerais,
      dadosEspecificos: {},
      climaLocal: dadosClima || 'Dados não capturados'
    };

    if (condicaoSelecionada === 'Enxaqueca') {
      registroFinal.dadosEspecificos = { intensidadeDor: intensidade, gatilhosSuspeitos: gatilhos, medicou, medicamentoUtilizado: medicamento };
    } else if (condicaoSelecionada === 'Pressão Arterial') {
      registroFinal.dadosEspecificos = { sistolica, diastolica, batimentosPorMinuto: bpm };
    }

    console.log('JSON FINAL:', JSON.stringify(registroFinal, null, 2));
    navigation.goBack();
  };

  const renderFormulariosDinamicos = () => {
    switch (condicaoSelecionada) {
      case 'Enxaqueca':
        return (
          <>
            <InputPadrao label="Intensidade da dor (0-10)" placeholder="Ex: 8" keyboardType="numeric" value={intensidade} onChangeText={setIntensidade} />
            <InputPadrao label="Possíveis Gatilhos" placeholder="Ex: Estresse, luz forte" value={gatilhos} onChangeText={setGatilhos} />
            <Text style={styles.label}>Tomou medicação?</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnLeft, medicou && styles.toggleBtnActive]} onPress={() => setMedicou(true)}>
                <Text style={medicou ? styles.toggleBtnTextActive : styles.toggleBtnText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnRight, !medicou && styles.toggleBtnActive]} onPress={() => setMedicou(false)}>
                <Text style={!medicou ? styles.toggleBtnTextActive : styles.toggleBtnText}>Não</Text>
              </TouchableOpacity>
            </View>
            {medicou && <InputPadrao label="Qual medicamento?" placeholder="Ex: Neosaldina" value={medicamento} onChangeText={setMedicamento} />}
          </>
        );

      case 'Pressão Arterial':
        return (
          <>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <InputPadrao label="Sistólica" placeholder="Ex: 120" keyboardType="numeric" value={sistolica} onChangeText={setSistolica} />
              </View>
              <View style={styles.halfInput}>
                <InputPadrao label="Diastólica" placeholder="Ex: 80" keyboardType="numeric" value={diastolica} onChangeText={setDiastolica} />
              </View>
            </View>
            <InputPadrao label="Batimentos (BPM)" placeholder="Ex: 75" keyboardType="numeric" value={bpm} onChangeText={setBpm} />
          </>
        );
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Feather name="chevron-left" size={28} color="#333" /></TouchableOpacity>
            <Text style={styles.headerTitle}>Novo Registro</Text>
            <TouchableOpacity onPress={() => setMenuVisivel(true)}><Feather name="menu" size={28} color="#333" /></TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.dropdown} activeOpacity={0.7} onPress={() => setModalSeletorVisivel(true)}>
            <Text style={styles.dropdownText}>{condicaoSelecionada}</Text>
            <Feather name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>

          {renderFormulariosDinamicos()}

          <InputPadrao label="Notas Gerais" placeholder="Alguma observação extra?" multiline numberOfLines={4} value={notasGerais} onChangeText={setNotasGerais} style={styles.textArea} />

          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            {buscandoClima ? (
              <ActivityIndicator size="small" color="#777" />
            ) : dadosClima ? (
              <Text style={styles.infoText}>
                Clima atualizado: {dadosClima.temperatura}°C | Umidade: {dadosClima.umidadeRelativa}%
              </Text>
            ) : null}
          </View>

          <BotaoPadrao texto="Salvar Registro" onPress={handleSalvar} />

        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalSeletorVisivel} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Selecione a Condição</Text>
            {comorbidadesDoUsuario.map((opcao) => (
              <TouchableOpacity key={opcao} style={styles.modalOption} onPress={() => { setCondicaoSelecionada(opcao); setModalSeletorVisivel(false); }}>
                <Text style={styles.modalOptionText}>{opcao}</Text>
              </TouchableOpacity>
            ))}
            <BotaoPadrao texto="Cancelar" onPress={() => setModalSeletorVisivel(false)} style={{ marginTop: 20, backgroundColor: '#777' }} />
          </View>
        </View>
      </Modal>

      <MenuSuperior visivel={menuVisivel} onClose={() => setMenuVisivel(false)} navigation={navigation} />
    </SafeAreaView>
  );
}