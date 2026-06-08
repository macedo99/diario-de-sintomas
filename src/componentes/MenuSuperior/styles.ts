import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)', // Fundo levemente escurecido
  },
  menuContainer: {
    position: 'absolute',
    top: 60, // Distância do topo para ficar alinhado ao botão
    right: 20, // Distância da borda direita
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 160,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  }
});