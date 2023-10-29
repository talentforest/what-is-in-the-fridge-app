import { HSSaemaulRegular } from '../constant/fonts';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BLUE,
  DEEP_GRAY,
  HEADER_BGCOLOR,
  TAB_BG_COLOR,
} from '../constant/colors';
import { PlatformIOS } from '../constant/statusBarHeight';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/common/native-component';

import Icon from '../components/common/native-component/Icon';
import Home from '../screens/Home';
import MyFridge from '../screens/MyFridge';
import PantryFoods from '../screens/PantryFoods';

export type RootTabParamList = {
  Home: undefined;
  MyFridge: undefined;
  PantryFoods: undefined | object;
};

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  allowFontScaling: false,
  tabBarActiveTintColor: BLUE,
  tabBarInactiveTintColor: '#aaa',
  tabBarIconStyle: {
    flex: 1,
  },
  tabBarLabelStyle: {
    paddingBottom: PlatformIOS ? 10 : 7,
    fontSize: 10,
    ...HSSaemaulRegular,
  },
};

const headerOptions: BottomTabNavigationOptions = {
  tabBarAllowFontScaling: false,
  tabBarHideOnKeyboard: PlatformIOS ? false : true,
  headerShown: true,
  headerTintColor: DEEP_GRAY,
  headerShadowVisible: false,
  headerLeftContainerStyle: { paddingLeft: 14 },
  headerRightContainerStyle: { paddingRight: 14 },
  headerStyle: {
    backgroundColor: HEADER_BGCOLOR,
  },
  headerTitleStyle: {
    fontSize: 17,
    ...HSSaemaulRegular,
  },
  headerTitleAlign: 'center',
};

export default function MyTabs() {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom;

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        ...tabBarOptions,
        tabBarStyle: {
          borderTopWidth: 1,
          backgroundColor: TAB_BG_COLOR,
          height: PlatformIOS ? 60 + bottomPadding : 55,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          ...headerOptions,
          tabBarIcon: ({ color }) => <TabIcon name='home' color={color} />,
          tabBarLabel: '홈',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='MyFridge'
        component={MyFridge}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name='fridge-outline' color={color} />
          ),
          tabBarLabel: '나의 냉장고',
          headerTitle: () => headerTitle('나의 냉장고'),
          ...headerOptions,
        }}
      />
      <Tab.Screen
        name='PantryFoods'
        component={PantryFoods}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name='box' color={color} />,
          tabBarLabel: '나의 팬트리',
          headerTitle: () => headerTitle('나의 팬트리'),
          title: '나의 팬트리',
          ...headerOptions,
        }}
      />
    </Tab.Navigator>
  );
}

export function TabIcon({ name, color }: { name: string; color: string }) {
  return (
    <Icon
      type={name === 'fridge-outline' ? 'MaterialCommunityIcons' : 'Feather'}
      name={name}
      color={color}
      size={name === 'fridge-outline' ? 17 : 15}
    />
  );
}

const headerTitle = (title: string) => {
  return (
    <Text allowFontScaling={false} style={{ fontSize: 17 }}>
      {title}
    </Text>
  );
};
