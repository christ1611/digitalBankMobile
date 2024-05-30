import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

const Name = () => {
  const [usrNm, setUsrNm] = useState('');
  const [userId, setUserId] = useState('');

  setTimeout(() => {
    AsyncStorage.getItem('userId').then(value => setUserId(value));
  }, 1000);

  setTimeout(() => {
    AsyncStorage.getItem('usrNm').then(value => setUsrNm(value));
  }, 1000);

  return (
    <View style={stylesSidebar.profileHeader}>
      <Trademark text={userId} />
      <Text style={stylesSidebar.profileHeaderText}>
        {userId} {'\n'} {usrNm}
      </Text>
    </View>
  );
};

const Trademark = props => {
  let lan = new String(props.text);
  return (
    <View style={stylesSidebar.profileHeaderPicCircle}>
      <Text style={{fontSize: 25, color: '#307ecc'}}>{lan.charAt(0)}</Text>
    </View>
  );
};

const SidebarMenu = props => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <Name />
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => <Text style={{color: '#d8d8d8'}}>Logout</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default SidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#307ecc',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#307ecc',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});
