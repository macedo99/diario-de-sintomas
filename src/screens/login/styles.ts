import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', 
    padding: 24, 
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
  },
  passwordContainer: {
    position: 'relative', 
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute', 
    right: 15,
    top: 42,
  },
  linkText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});