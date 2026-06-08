import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { MenuSuperior } from '../../componentes/MenuSuperior/MenuSuperior';

export function NovoRegistro({ navigation }: any) {
  const [menuVisivel, setMenuVisivel] = useState(false);
  
  const [modalSeletorVisivel, setModalSeletorVisivel] = useState(false);
  const [condicaoSelecionada, setCondicaoSelecionada] = useState('Enxaqueca');

  const [notasGerais, setNotasGerais] = useState('');

  const [intensidade, setIntensidade] = useState('');
  const [gatilhos, setGatilhos] = useState('');
  const [medicou, setMedicou] = useState(false);
  const [medicamento, setMedicamento] = useState('');
  
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [bpm, setBpm] = useState('');

  const [glicemia, setGlicemia] = useState('');
  const [momentoMedicao, setMomentoMedicao] = useState('');
  const [aplicouInsulina, setAplicouInsulina] = useState(false);
  const [unidadesInsulina, setUnidadesInsulina] = useState('');

  const [sintomasAlergia, setSintomasAlergia] = useState('');

  const handleSalvar = () => {
    console.log('Condição:', condicaoSelecionada);
    console.log('Notas:', notasGerais);
    navigation.goBack();
  };

  // Função que renderiza os campos dinamicamente
  const renderFormulariosDinamicos = () => {
    switch (condicaoSelecionada) {
      case 'Enxaqueca':
        return (
          <>
            <Text style={styles.label}>Intensidade da dor (0-10):</Text>
            <TextInput style={styles.input} placeholder="Ex: 8" keyboardType="numeric" value={intensidade} onChangeText={setIntensidade} />
            
            <Text style={styles.label}>Possíveis Gatilhos:</Text>
            <TextInput style={styles.input} placeholder="Ex: Estresse, luz forte" value={gatilhos} onChangeText={setGatilhos} />
            
            <Text style={styles.label}>Tomou medicação?</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnLeft, medicou && styles.toggleBtnActive]} onPress={() => setMedicou(true)}>
                <Text style={medicou ? styles.toggleBtnTextActive : styles.toggleBtnText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnRight, !medicou && styles.toggleBtnActive]} onPress={() => setMedicou(false)}>
                <Text style={!medicou ? styles.toggleBtnTextActive : styles.toggleBtnText}>Não</Text>
              </TouchableOpacity>
            </View>

            {medicou && (
              <>
                <Text style={styles.label}>Qual medicamento?</Text>
                <TextInput style={styles.input} placeholder="Ex: Neosaldina" value={medicamento} onChangeText={setMedicamento} />
              </>
            )}
          </>
        );

      case 'Pressão Arterial':
        return (
          <>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Sistólica:</Text>
                <TextInput style={styles.input} placeholder="Ex: 120" keyboardType="numeric" value={sistolica} onChangeText={setSistolica} />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Diastólica:</Text>
                <TextInput style={styles.input} placeholder="Ex: 80" keyboardType="numeric" value={diastolica} onChangeText={setDiastolica} />
              </View>
            </View>
            <Text style={styles.label}>Batimentos por minuto (BPM):</Text>
            <TextInput style={styles.input} placeholder="Ex: 75" keyboardType="numeric" value={bpm} onChangeText={setBpm} />
          </>
        );

      case 'Diabetes':
        return (
          <>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Glicemia (mg/dL):</Text>
                <TextInput style={styles.input} placeholder="Ex: 95" keyboardType="numeric" value={glicemia} onChangeText={setGlicemia} />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Momento:</Text>
                <TextInput style={styles.input} placeholder="Ex: Jejum" value={momentoMedicao} onChangeText={setMomentoMedicao} />
              </View>
            </View>

            <Text style={styles.label}>Aplicou Insulina?</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnLeft, aplicouInsulina && styles.toggleBtnActive]} onPress={() => setAplicouInsulina(true)}>
                <Text style={aplicouInsulina ? styles.toggleBtnTextActive : styles.toggleBtnText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnRight, !aplicouInsulina && styles.toggleBtnActive]} onPress={() => setAplicouInsulina(false)}>
                <Text style={!aplicouInsulina ? styles.toggleBtnTextActive : styles.toggleBtnText}>Não</Text>
              </TouchableOpacity>
            </View>

            {aplicouInsulina && (
              <>
                <Text style={styles.label}>Unidades de Insulina:</Text>
                <TextInput style={styles.input} placeholder="Ex: 10" keyboardType="numeric" value={unidadesInsulina} onChangeText={setUnidadesInsulina} />
              </>
            )}
          </>
        );

      case 'Alergias':
        return (
          <>
            <Text style={styles.label}>Intensidade dos Sintomas (0-10):</Text>
            <TextInput style={styles.input} placeholder="Ex: 6" keyboardType="numeric" value={intensidade} onChangeText={setIntensidade} />
            
            <Text style={styles.label}>Sintomas Apresentados:</Text>
            <TextInput style={styles.input} placeholder="Ex: Coriza, coceira" value={sintomasAlergia} onChangeText={setSintomasAlergia} />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Feather name="chevron-left" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Novo Registro</Text>
            <TouchableOpacity onPress={() => setMenuVisivel(true)} activeOpacity={0.7}>
              <Feather name="menu" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.dropdown} activeOpacity={0.7} onPress={() => setModalSeletorVisivel(true)}>
            <Text style={styles.dropdownText}>{condicaoSelecionada}</Text>
            <Feather name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>

          {renderFormulariosDinamicos()}

          <Text style={styles.label}>Notas Gerais:</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Alguma observação extra?" 
            multiline 
            value={notasGerais} 
            onChangeText={setNotasGerais} 
          />

          <Text style={styles.infoText}>Data/Hora e dados do clima serão adicionados automaticamente a cada novo registro.</Text>

          <TouchableOpacity style={styles.button} onPress={handleSalvar} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Salvar Registro</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalSeletorVisivel} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Selecione a Condição</Text>
            
            {['Enxaqueca', 'Pressão Arterial', 'Diabetes', 'Alergias'].map((opcao) => (
              <TouchableOpacity 
                key={opcao} 
                style={styles.modalOption} 
                onPress={() => {
                  setCondicaoSelecionada(opcao);
                  setModalSeletorVisivel(false);
                }}
              >
                <Text style={styles.modalOptionText}>{opcao}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={[styles.button, {marginTop: 20, marginBottom: 0}]} onPress={() => setModalSeletorVisivel(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MenuSuperior visivel={menuVisivel} onClose={() => setMenuVisivel(false)} navigation={navigation} />
    </SafeAreaView>
  );
}