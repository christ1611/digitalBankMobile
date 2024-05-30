import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, TouchableOpacity} from 'react-native';
// Import Screens
import HomeScreen from '../pages/HomeScreen';
import TransactionScreen from '../pages/TransactionScreen';
import Notifications from '../pages/Notifications';
import Inquiry from '../pages/Inquiry'
import MyInfo from '../pages/MyInfo';
import SidebarMenu from '../layout/SidebarMenu';
import NavigationHeader from '../layout/NavigationHeader';
import SettingButton from '../layout/SettingButton';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerRight: () => <SettingButton navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const transactionScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="TransactionScreen">
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          title: 'Transaction', //Set Header Title
          headerRight: () => <SettingButton navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const inquiryScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="InquiryScreen">
      <Stack.Screen
        name="InquiryScreen"
        component={Inquiry}
        options={{
          title: 'Inquiry', //Set Header Title
          headerRight: () => <SettingButton navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const paymentScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="PaymentScreen">
      <Stack.Screen
        name="PaymentScreen"
        component={Notifications}
        options={{
          title: 'Payment', //Set Header Title
          headerRight: () => <SettingButton navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const myInfoScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MyInfoScreen">
      <Stack.Screen
        name="MyInfoScreen"
        component={MyInfo}
        options={{
          title: 'My Info', //Set Header Title
          headerRight: () => <SettingButton navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};


const NavigatorRoutes = props => {
  return (
    
    <Tab.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
>
      <Tab.Screen
        name="homeScreenStack"
        options={{tabBarLabel: 'Home', tabBarIcon: ({ tintColor }) => (
          <Image source={require('../../assets/home.png')} style={{width: 25, height: 25, marginLeft: 5}}    />
        )}}
        component={homeScreenStack}
      />
      <Tab.Screen
        name="transactionScreenStack"
        options={{tabBarLabel: 'Transaction', tabBarIcon: ({ tintColor }) => (
          <Image source={require('../../assets/arrow-downward.png')} style={{width: 25, height: 25, marginLeft: 5}}    />
        )}}
        component={transactionScreenStack}
      />
      <Tab.Screen
        name="inquiryScreenStack"
        options={{tabBarLabel: 'Inquiry', tabBarIcon: ({ tintColor }) => (
          <Image source={require('../../assets/browser.png')} style={{width: 25, height: 25, marginLeft: 5}}    />
        )}}
        component={inquiryScreenStack}
      />
      <Tab.Screen
        name="paymentScreenStack"
        options={{tabBarLabel: 'Payment', tabBarIcon: ({ tintColor }) => (
          <Image source={require('../../assets/shopping-cart.png')} style={{width: 25, height: 25, marginLeft: 5}}    />
        )}}
        component={paymentScreenStack}
      />
      <Tab.Screen
        name="myInfoScreenStack"
        options={{tabBarLabel: 'My Info', tabBarIcon: ({ tintColor }) => (
          <Image source={require('../../assets/person.png')} style={{width: 25, height: 25, marginLeft: 5}}    />
        )}}
        component={myInfoScreenStack}
      />

    </Tab.Navigator>

  );
};

export default NavigatorRoutes;
