import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

interface MenuSuperiorProps {
  visivel: boolean;
  onClose: () => void;
  navigation: any;
}

export function MenuSuperior({ visivel, onClose, navigation }: MenuSuperiorProps) {
  const handleAcao = (acao: string) => {
    onClose(); // Fecha o menu primeiro
    
    if (acao === 'Sair') {
      navigation.replace('Login'); 
    } else if (acao === 'Relatorio') {
      navigation.navigate('Relatorio'); 
    } else if (acao === 'Perfil') {
      navigation.navigate('Perfil');
    }
  };

  return (
    <Modal visible={visivel} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => handleAcao('Perfil')}>
                <Feather name="user" size={20} color="#333" />
                <Text style={styles.menuText}>Meu Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleAcao('Relatorio')}>
                <Feather name="file-text" size={20} color="#333" />
                <Text style={styles.menuText}>Relatórios</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => handleAcao('Sair')}>
                <Feather name="log-out" size={20} color="#E53935" />
                <Text style={[styles.menuText, { color: '#E53935' }]}>Sair</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}