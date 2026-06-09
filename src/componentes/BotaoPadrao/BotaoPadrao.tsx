import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

interface BotaoPadraoProps extends TouchableOpacityProps {
  texto: string;
}

export function BotaoPadrao({ texto, style, ...rest }: BotaoPadraoProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      activeOpacity={0.8} 
      {...rest}
    >
      <Text style={styles.buttonText}>{texto}</Text>
    </TouchableOpacity>
  );
}