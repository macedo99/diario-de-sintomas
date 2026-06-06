import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    borderWidth: 2,
    borderColor: '#333',
    padding: 20,
    borderRadius: 12,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});