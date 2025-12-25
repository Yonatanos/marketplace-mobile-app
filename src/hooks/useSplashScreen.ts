import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { logger } from '../utils/logger';

export const useSplashScreen = (shouldHide: boolean) => {
  useEffect(() => {
    const hideSplash = async () => {
      if (shouldHide) {
        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          logger.log('[useSplashScreen] Error hiding splash:', error);
        }
      }
    };

    hideSplash();
  }, [shouldHide]);
};
