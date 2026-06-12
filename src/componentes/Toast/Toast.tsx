import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ToastType } from '../../hooks/useToast';

interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  onHide: () => void;
}

const BG: Record<ToastType, string> = {
  error:   '#D32F2F',
  success: '#388E3C',
  info:    '#1565C0',
};

const ICONS: Record<ToastType, string> = {
  error:   '✕',
  success: '✓',
  info:    'ℹ',
};

export function Toast({ visible, message, type, onHide }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity,     { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(translateY,  { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity,     { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY,  { toValue: -20, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  // Access internal animated value safely for TypeScript: cast to any to avoid type error
  if (!visible && (opacity as any)._value === 0) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: BG[type], opacity, transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.icon}>{ICONS[type]}</Text>
      <Text style={styles.message} numberOfLines={2}>{message}</Text>
      <TouchableOpacity onPress={onHide} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.close}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  icon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  close: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
});
