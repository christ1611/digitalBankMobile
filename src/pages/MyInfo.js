import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Icon, Button, Avatar } from 'react-native-elements'
import axios from 'axios';

const TodoListPage = props => {
  const [imageUrl, setImageUrl] = useState("https://facebook.github.io/react-native/img/tiny_logo.png");

  const [userProf, setUserProf] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [userId, setUserId] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [authToken, setAuthToken] = useState('');

  setTimeout(() => {
    AsyncStorage.getItem('userId').then(value => setUserId(value));
  }, 1000);
  setTimeout(() => {
    AsyncStorage.getItem('refreshToken').then(value => setRefreshToken(value));
  }, 1000);
  setTimeout(() => {
    AsyncStorage.getItem('authToken').then(value => setAuthToken(value));
  }, 1000);

 
    useEffect(() => {
        requestAdorablePomeranianImage();

        // componentWillUnmount
        return () => {
            // cancel axios when componentWillUnmount()
            axios.Cancel();
        }
    }, [])

    const requestAdorablePomeranianImage = () => {
      let URL = 'http://10.10.1.170/CMO0101A.SVC';
      let config = {
        headers: {
          'x-auth-token': authToken,
          'x-refresh-token': refreshToken,
        },
      };
      let data = {
        input: {blngBrNo: "0888", userId: "PATATE", trscDvCd: "0"},
        SysInfo: {
          acBrNo: "0888",
          baseCurCd: "",
          bussBrUpdAlwnYn: "Y",
          bussDt: "",
          certsNo: "",
          chnlTypCd: "ONL",
          cntyCd: "",
          dtFrmt: "yyyymmdd",
          dtMarkFrmt: "YYYY/MM/DD",
          globId: "20210624 PATATEONL354FDE5AE01",
          instCd: "0000",
          ipAddr: "",
          istBrNo: "0888",
          lnggCd: "en",
          lnkIndvCanYn: "N",
          logLev: "E",
          procSvcCd: "COMBOBOXSVC",
          pwStCd: "A",
          rcknDt: "",
          rsprApvAlwnYn: "Y",
          rsprApvCreYn: "N",
          rsprApvDvCd: "S",
          rsprApvYn: "",
          rsprMngrId: "",
          rsprTrscGlobId: "",
          scrnId: "CU0101",
          scrnMsgPrnYn: "N",
          smltnTrscYn: "N",
          subjCd: "CU",
          sysDvCd: "",
          sysLnggCd: "US",
          testGlobId: "",
          tmlNo: "0888",
          trscBrNo: "0888",
          trscCd: "",
          trscDt: "20210531",
          userId: "PATATE",
          usrNm: "INHWA SON",
          wsDemnIpAdr: "10.10.1.170",
          wsDemnPort: "9092"
        },
      };
      axios
      .post(URL, data, config)
      .then(res => {
     
        let custData = JSON.stringify(res.data.output);
        setUserProf(res.data.output);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
        axios.get("pomeranian/images/random").then(res => {
            setImageUrl(res.data.message);
        }).catch(err => {
            console.log(err);
        })
    }

    const CreateCard = prop => {
      const obj = prop.userProf
      const ooo = Object.keys(obj)
      const xxx=ooo.toString();
      return (
        <ScrollView>
          {
            
            Object.keys(obj).map((key, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={require('../../assets/home.png')} />
                <ListItem.Content>
                  <ListItem.Title>{key}</ListItem.Title>
                  <ListItem.Subtitle>{obj[key]}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
  
            )
            )
          }
        </ScrollView>
      )
    };
    return (
      <SafeAreaView style={{flex: 1, justifyContent: "center"}}>        
        <View style={styles.titleContainer}>
          
              <Image style={styles.titleImage} source={{ uri: imageUrl }} />
         
        </View>
        <CreateCard userProf={userProf} />
    </SafeAreaView>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
    title: {
        color: 'black',
        fontSize: 36,
        fontWeight: '300',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
    },
    titleImage: {
        width: 100,
        height: 100,
    }
});

export default TodoListPage;