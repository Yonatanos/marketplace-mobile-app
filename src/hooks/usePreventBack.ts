import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const usePreventBack = () => {
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress',() => {
          return true;
        }
      );

      return () => {
        subscription.remove();
      };
    }, [])
  );
};