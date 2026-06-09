import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { styles } from './styles';
import { MenuSuperior } from '../../componentes/MenuSuperior/MenuSuperior';

export function Relatorio({ navigation }: any) {
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [modalPeriodoVisivel, setModalPeriodoVisivel] = useState(false);
  
  const [periodoLabel, setPeriodoLabel] = useState('Últimos 30 dias');
  const [periodoDias, setPeriodoDias] = useState(30); // O número real que o backend precisa
  const [filtroEnxaqueca, setFiltroEnxaqueca] = useState(false);
  const [filtroPressao, setFiltroPressao] = useState(false);

  const opcoesPeriodo = [
    { label: 'Últimos 7 dias', dias: 7 },
    { label: 'Últimos 30 dias', dias: 30 },
    { label: 'Últimos 90 dias', dias: 90 },
  ];

  const handleSelecionarPeriodo = (label: string, dias: number) => {
    setPeriodoLabel(label);
    setPeriodoDias(dias);
    setModalPeriodoVisivel(false);
  };

  const handleGerarPDF = async () => {
    if (!filtroEnxaqueca && !filtroPressao) {
      Alert.alert('Atenção', 'Selecione pelo menos uma condição para gerar o relatório.');
      return;
    }

    const filtrosEscolhidos = {
      dias: periodoDias,
      enxaqueca: filtroEnxaqueca,
      pressao: filtroPressao
    };
    
    console.log('Solicitando dados ao Backend com os filtros:', filtrosEscolhidos);

    // Teste visual PDF
    const dadosMockados = {
      enxaqueca: [
        { data: '09/04/2026', intensidade: 8, gatilhos: 'Noite mal dormida, Estresse' }
      ],
      pressao: [
        { data: '10/04/2026', sistolica: 130, diastolica: 85, bpm: 72 },
        { data: '12/04/2026', sistolica: 125, diastolica: 80, bpm: 68 }
      ]
    };

    const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            h1 { text-align: center; color: #111; font-size: 28px; margin-bottom: 5px; }
            .subtitle { text-align: center; color: #777; font-size: 16px; margin-bottom: 40px; }
            .section-title { font-size: 20px; color: #333; border-bottom: 2px solid #EEE; padding-bottom: 8px; margin-top: 30px; margin-bottom: 15px; }
            .card { background-color: #FAFAFA; border: 1px solid #E0E0E0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
            .card-header { font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #000; }
            .card-text { font-size: 14px; color: #555; margin: 4px 0; }
          </style>
        </head>
        <body>
          <h1>Relatório de Saúde</h1>
          <div class="subtitle">Período: ${periodoLabel}</div>

          ${filtroEnxaqueca ? `
            <div class="section-title">Registros de Enxaqueca</div>
            ${dadosMockados.enxaqueca.map(reg => `
              <div class="card">
                <div class="card-header">${reg.data}</div>
                <div class="card-text"><strong>Intensidade:</strong> ${reg.intensidade}/10</div>
                <div class="card-text"><strong>Gatilhos:</strong> ${reg.gatilhos}</div>
              </div>
            `).join('')}
          ` : ''}

          ${filtroPressao ? `
            <div class="section-title">Registros de Pressão Arterial</div>
            ${dadosMockados.pressao.map(reg => `
              <div class="card">
                <div class="card-header">${reg.data}</div>
                <div class="card-text"><strong>Pressão:</strong> ${reg.sistolica}/${reg.diastolica}</div>
                <div class="card-text"><strong>BPM:</strong> ${reg.bpm}</div>
              </div>
            `).join('')}
          ` : ''}
          
          <div style="text-align: center; margin-top: 50px; font-size: 12px; color: #999;">
            Documento gerado pelo aplicativo Diário de Sintomas.
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      Alert.alert('Erro', 'Não foi possível gerar o documento PDF.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Feather name="chevron-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Emitir Relatório</Text>
          <TouchableOpacity onPress={() => setMenuVisivel(true)} activeOpacity={0.7}>
            <Feather name="menu" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Período</Text>
        <TouchableOpacity style={styles.dropdown} activeOpacity={0.7} onPress={() => setModalPeriodoVisivel(true)}>
          <Text style={styles.dropdownText}>{periodoLabel}</Text>
          <Feather name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxCard} activeOpacity={0.7} onPress={() => setFiltroEnxaqueca(!filtroEnxaqueca)}>
          <View style={[styles.checkbox, filtroEnxaqueca && styles.checkboxSelected]}>
            {filtroEnxaqueca && <Feather name="check" size={16} color="#FFF" />}
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Enxaqueca</Text>
            <Text style={styles.cardSubtitle}>Incluir no relatório</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxCard} activeOpacity={0.7} onPress={() => setFiltroPressao(!filtroPressao)}>
          <View style={[styles.checkbox, filtroPressao && styles.checkboxSelected]}>
            {filtroPressao && <Feather name="check" size={16} color="#FFF" />}
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Pressão Arterial</Text>
            <Text style={styles.cardSubtitle}>Incluir no relatório</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGerarPDF} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Gerar PDF</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal visible={modalPeriodoVisivel} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Selecione o Período</Text>
            
            {opcoesPeriodo.map((opcao, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.modalOption} 
                onPress={() => handleSelecionarPeriodo(opcao.label, opcao.dias)}
              >
                <Text style={styles.modalOptionText}>{opcao.label}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={[styles.button, {marginTop: 20, marginBottom: 0}]} onPress={() => setModalPeriodoVisivel(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MenuSuperior visivel={menuVisivel} onClose={() => setMenuVisivel(false)} navigation={navigation} />
    </SafeAreaView>
  );
}