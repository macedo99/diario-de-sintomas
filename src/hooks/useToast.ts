import { useState, useCallback, useRef } from 'react';

export type ToastType = 'error' | 'success' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({ visible: true, message, type });

    timerRef.current = setTimeout(() => {
      setToast(s => ({ ...s, visible: false }));
    }, duration);
  }, []);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(s => ({ ...s, visible: false }));
  }, []);

  return { toast, show, hide };
}
