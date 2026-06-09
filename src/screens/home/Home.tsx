import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  FlatList 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { MenuSuperior } from '../../componentes/MenuSuperior/MenuSuperior';

const mockRegistros = [
  {
    id: '1',
    tipo: 'Enxaqueca',
    dataHora: '09/04/26 - 17:58',
    icone: 'zap',
    detalhes: ['Intensidade: 8/10', 'Gatilhos: Noite mal dormida, Estresse', 'Medicou: Sim (Neosaldina)'],
  },
  {
    id: '2',
    tipo: 'Pressão Arterial',
    dataHora: '10/04/26 - 12:21',
    icone: 'heart',
    detalhes: ['Pressão: 130/85', 'BPM: 72', 'Notas: Medição antes do café'],
  },
  {
    id: '3',
    tipo: 'Diabetes',
    dataHora: '10/04/26 - 12:39',
    icone: 'droplet',
    detalhes: ['Glicemia: 145 mg/dL', 'Momento: Pós-almoço', 'Insulina: Não aplicada'],
  },
  {
    id: '4',
    tipo: 'Crise Alérgica',
    dataHora: '11/04/26 - 17:41',
    icone: 'hash',
    detalhes: ['Intensidade: 7/10', 'Sintomas: Espirros, coceira, coriza', 'Notas: Crise forte enquanto limpava'],
  }
];

export function Home({ navigation }: any) {
  const [menuVisivel, setMenuVisivel] = useState(false);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Feather name={item.icone} size={20} color="#333" />
          <Text style={styles.cardTitle}>{item.tipo}</Text>
        </View>
        <Text style={styles.cardDate}>{item.dataHora}</Text>
      </View>
      
      <View style={styles.cardContent}>
        {item.detalhes.map((detalhe: string, index: number) => (
          <Text key={index} style={styles.cardText}>{detalhe}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.greeting}>Olá, usuário!</Text>
        </View>
        
        <TouchableOpacity onPress={() => setMenuVisivel(true)} activeOpacity={0.7}>
          <Feather name="menu" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Últimos registros:</Text>

      <FlatList
        data={mockRegistros}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NovoRegistro')}
      >
        <Feather name="plus" size={32} color="#FFF" />
      </TouchableOpacity>

      <MenuSuperior 
        visivel={menuVisivel} 
        onClose={() => setMenuVisivel(false)} 
        navigation={navigation} 
      />
    </SafeAreaView>
  );
}