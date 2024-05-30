import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Picker,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const Notifications = ({navigation}) => {
  const [custId, setCustId] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isShowingText, setIsShowingText] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [authToken, setAuthToken] = useState('');

  setTimeout(() => {
    AsyncStorage.getItem('userId').then(value => setIsShowingText(value));
  }, 1000);
  setTimeout(() => {
    AsyncStorage.getItem('refreshToken').then(value => setRefreshToken(value));
  }, 1000);
  setTimeout(() => {
    AsyncStorage.getItem('authToken').then(value => setAuthToken(value));
  }, 1000);

  const sendToker = () => {
    alert('token: ' + refreshToken);
  };

  const sendTestRequest = () => {
    let URL = 'http://10.10.1.160:9080/OLI/NonStdInHttp/HNB';
    let config = {
      headers: {
        'x-auth-token': authToken,
        'x-refresh-token': refreshToken,
      },
    };
    let data = {
      input: {
        inpCustNo: '',
        acnmNo: '',
        custNm: '',
        currentPageIndex: '',
        pageRowCount: '15',
        totalRowCount: '',
      },
      SysInfo: {
        instCd: '0000',
        acBrNo: '',
        baseCurCd: '',
        bussBrUpdAlwnYn: 'Y',
        chnlTypCd: 'ONL',
        cntyCd: '',
        dtFrmt: 'yyyymmdd',
        dtMarkFrmt: 'YYYY/MM/DD',
        globId: '20210616 PATATEONL25E48FB6A01',
        istBrNo: '0888',
        logLev: 'E',
        rsprApvAlwnYn: 'Y',
        rsprApvYn: '',
        rsprTrscGlobId: '',
        rsprMngrId: '',
        scrnId: 'CU0101',
        smltnTrscYn: 'N',
        subjCd: 'CU',
        sysDvCd: '',
        sysLnggCd: 'US',
        tmlNo: '0888',
        trscBrNo: '0888',
        trscDt: '20210615',
        bussDt: '',
        userId: 'PATATE',
        usrNm: 'INHWA SON',
        rcknDt: '',
        trscCd: '',
        procSvcCd: 'COMBOBOXSVC',
        wsDemnIpAdr: '10.10.1.170',
        wsDemnPort: '9092',
        ipAddr: '',
        lnkIndvCanYn: 'N',
        scrnMsgPrnYn: 'N',
        rsprApvCreYn: 'N',
        lnggCd: 'ko',
        rsprApvDvCd: 'S',
        certsNo: '',
        testGlobId: '',
        pwStCd: 'A',
      },
    };
    axios
      .post(URL, data, config)
      .then(res => {
        let custData = JSON.stringify(res.data.output);
        console.log(res)
        //setCustId(res.data.output.grid01);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const CreatePicker = prop => {
    const arr = prop.custId;

    if (arr == '') {
      return <Text> No data</Text>;
    } else {
      return (
        <Picker selectedValue={selectedValue} onValueChange={setSelectedValue}>
          {arr.map((data, i) => {
            return <Picker.Item key={i} value={data} label={data.custNo} />;
          })}
        </Picker>
      );
    }
  };
  const ShowData = prop => {
    const arr = prop.data;

    if (arr == '') {
      return <Text> No data</Text>;
    } else {
      const strs = JSON.stringify(arr['custNo']);
      const globalId = JSON.stringify(arr['custDvCd']);
      const phone = JSON.stringify(arr['mbleMbphNo']);
      const mng = JSON.stringify(arr['mngBrNo']);
      return (
        <View>
          <Text> ID: {strs}</Text>
          <Text> Dv: {globalId}</Text>
          <Text> Phone: {phone}</Text>
          <Text> Branch: {mng}</Text>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <TouchableOpacity style={styles.buttonStyle} onPress={sendTestRequest}>
          <Text>Get the user</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Customer names!!!</Text>

        <Text>Pick a user</Text>

        <ScrollView>
          <CreatePicker custId={custId} />
          <Text>User Information : </Text>
          <ShowData data={selectedValue} />
        </ScrollView>

        <TouchableOpacity style={styles.buttonStyle} onPress={sendToker}>
          <Text>Show Tokens</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'blue',
  },
});