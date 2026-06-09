import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

interface InputPadraoProps extends TextInputProps {
  label: string;
}

export function InputPadrao({ label, style, ...rest }: InputPadraoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={[styles.input, style]} 
        placeholderTextColor="#999"
        {...rest} 
      />
    </View>
  );
}