import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import OverviewScreen from '../screens/OverviewScreen';
import DayDetailScreen from '../screens/DayDetailScreen';
import PackingListScreen from '../screens/PackingListScreen';
import FlightsScreen from '../screens/FlightsScreen';
import FlightDetailScreen from '../screens/FlightDetailScreen';
import DestinationsScreen from '../screens/DestinationsScreen';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import WildlifeScreen from '../screens/WildlifeScreen';
import AnimalDetailScreen from '../screens/AnimalDetailScreen';
import DocumentsScreen from '../screens/DocumentsScreen';

export type OverviewStackParamList = {
  Overview: undefined;
  DayDetail: { dayIndex: number };
  PackingList: undefined;
  FlightsList: undefined;
  FlightDetail: { groupId: string };
};

export type DestinationsStackParamList = {
  DestinationsList: undefined;
  DestinationDetail: { destinationId: string };
};

export type WildlifeStackParamList = {
  WildlifeList: undefined;
  AnimalDetail: { animalId: string };
};

const OverviewStack = createNativeStackNavigator<OverviewStackParamList>();
const DestinationsStack = createNativeStackNavigator<DestinationsStackParamList>();
const WildlifeStack = createNativeStackNavigator<WildlifeStackParamList>();
const Tab = createBottomTabNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '600' as const },
};

function OverviewNavigator() {
  return (
    <OverviewStack.Navigator screenOptions={stackScreenOptions}>
      <OverviewStack.Screen name="Overview" component={OverviewScreen} options={{ title: 'Trip Overview' }} />
      <OverviewStack.Screen name="DayDetail" component={DayDetailScreen} options={{ title: 'Day Details' }} />
      <OverviewStack.Screen name="PackingList" component={PackingListScreen} options={{ title: 'Packing List' }} />
      <OverviewStack.Screen name="FlightsList" component={FlightsScreen} options={{ title: 'Our Flights' }} />
      <OverviewStack.Screen name="FlightDetail" component={FlightDetailScreen} options={{ title: '' }} />
    </OverviewStack.Navigator>
  );
}

function DestinationsNavigator() {
  return (
    <DestinationsStack.Navigator screenOptions={stackScreenOptions}>
      <DestinationsStack.Screen name="DestinationsList" component={DestinationsScreen} options={{ title: 'Destinations' }} />
      <DestinationsStack.Screen name="DestinationDetail" component={DestinationDetailScreen} options={{ title: '' }} />
    </DestinationsStack.Navigator>
  );
}

function WildlifeNavigator() {
  return (
    <WildlifeStack.Navigator screenOptions={stackScreenOptions}>
      <WildlifeStack.Screen name="WildlifeList" component={WildlifeScreen} options={{ title: 'Wildlife Guide' }} />
      <WildlifeStack.Screen name="AnimalDetail" component={AnimalDetailScreen} options={{ title: '' }} />
    </WildlifeStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.primary,
          paddingBottom: 4,
          paddingHorizontal: 12,
          height: 60,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, marginTop: -2 },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Trip: 'calendar-outline',
            Destinations: 'map-outline',
            Wildlife: 'paw-outline',
            Documents: 'folder-outline',
          };
          return <Ionicons name={icons[route.name] ?? 'ellipse-outline'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Trip" component={OverviewNavigator} options={{ title: 'Trip' }} />
      <Tab.Screen name="Destinations" component={DestinationsNavigator} />
      <Tab.Screen name="Wildlife" component={WildlifeNavigator} />
      <Tab.Screen name="Documents" component={DocumentsScreen} options={{ title: 'Docs', headerShown: true, headerStyle: { backgroundColor: colors.primary }, headerTintColor: colors.white, headerTitle: 'My Documents' }} />
    </Tab.Navigator>
  );
}
