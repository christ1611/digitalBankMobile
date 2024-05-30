import React from 'react';
import {View, Image, Alert,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const Settings = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity    onPress={() => {

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
                    props.navigationProps.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
        <Image
          source={require('../../assets/log-out.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
