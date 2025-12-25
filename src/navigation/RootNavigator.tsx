import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { STRINGS } from '@/constants/strings';
import { SCREEN_NAMES } from '@/constants/screenNames';
import { RootStackParamList, MainTabParamList } from '@/types/navigation';
import { ProductsScreen } from '@/features/products/screens/ProductsScreen';
import { ProductDetailsScreen } from '@/features/products/screens/ProductDetailsScreen';
import { CartScreen } from '@/features/cart/screens/CartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={SCREEN_NAMES.SHOP}
        component={ProductsScreen}
        options={{
          title: STRINGS.navigation.marketplace,
          tabBarIcon: ({ color, size }) => <Ionicons name="storefront" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.CART}
        component={CartScreen}
        options={{
          title: STRINGS.navigation.cart,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREEN_NAMES.MAIN_TABS} component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name={SCREEN_NAMES.PRODUCT_DETAILS} component={ProductDetailsScreen} options={{ title: STRINGS.navigation.productInfo }} />
    </Stack.Navigator>
  );
};
