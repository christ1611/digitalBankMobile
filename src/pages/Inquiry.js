import React, { useState, useEffect } from 'react';
import {
  View,  Platform, StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useForm, Controller  } from "react-hook-form";
import axios from 'axios';
import { Colors } from '../components/Colors';
import { SearchBar, Card, ListItem, Input, Button, Avatar,Overlay, ButtonGroup, CheckBox  } from 'react-native-elements'
import Moment from 'moment';
const InquiryScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const [custNo, setCustNo] = useState("");
  const [branch, setBranch] = useState("");
  const [accountTp, setAccountTp] = useState("Current Deposit");
  const [status, setStatus] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    requestData();

    // componentWillUnmount
    return () => {
        // cancel axios when componentWillUnmount()
        axios.Cancel();
    }
}, 10000)
const requestData = () => {
  let URL = 'http://10.10.1.160:8090/ui/account/hnb/m/DPO0200A';
  let config = {
  };
  let data = {
      "custNo": custNo,
      "subjCd": status,
      "actDvCd": accountTp,
      "brNo": branch
  };

  axios
  .post(URL, data)
  .then(res => {
    
    let custData = JSON.stringify(res.data);
 
    setData(res.data);
  })
  .catch(error => {
    //Hide Loader
    setLoading(false);
    console.error(error);
  });
}
const toggleOverlay = () => {
  setOverlayVisible(!overlayVisible);
};
const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
};
const ItemView = ({ item }) => {
  

  return (
    // Flat List Item
    <ListItem key={item.acctNo}>

      
      <Avatar source={(item.bal>0) ? require('../../assets/arrow-circle-right.png'): require('../../assets/arrow-circle-left.png')} />
      <ListItem.Content key={item.acctNo}>
        <ListItem.Title>{item.custNm.toUpperCase()}</ListItem.Title>
        <ListItem.Subtitle>{item.expiDt}</ListItem.Subtitle>
        <ListItem.Subtitle style={{
        color: (item.bal>0) ?'green':'red',
        backgroundColor: '#C8C8C8',
      }}>{item.bal}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>

  );
};
const OverlayContent= props =>{
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = data => console.log(data);
  const [buttonState, setButtonState] =useState("Current Deposit")
  const buttons = ["Current Deposit", "Saving Deposit", "Time Deposit", "Installment Deposit"]
  function combined(){
    requestData();
    toggleOverlay();
  }
  return(
    <View>
      <Text>Customer No.</Text>
      <TextInput
        name="custNo"
        onChangeText={custNo => setCustNo(custNo)}
        defaultValue=""
      />

      <Text>Branch Name</Text>
      <TextInput
        name="branch name"
        onChangeText={branch => setBranch(branch)}
        defaultValue=""
      />

      <Text>Account Type</Text>
      <ButtonGroup
        onPress={setAccountTp}
        selectedIndex={accountTp}
        buttons={buttons}
        containerStyle={{height: 40}}
      />

      <CheckBox
        center
        title='Active Status'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={status}
        onPress={() => setStatus(!status)}
      />
      <Button title="Submit" onPress={combined} />
      <Button title="Close" type="outline" onPress={toggleOverlay} />
    </View>

  )

}

const AccordianView= props =>{
  const [expanded, setExpanded] = useState(false);
  const item = props.text;
  const openDate= Moment(item.openDt).format('MMM DD, YYYY');
  const expiDate= (item.expiDt!="") ? Moment(item.expiDt).format('MMM DD, YYYY') : "Unlimited";
  return(
    <ListItem.Accordion key={item.acctNo}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>Product: {item.prdNm}</ListItem.Title>
                  <ListItem.Subtitle>{item.acctNo}</ListItem.Subtitle>
                </ListItem.Content>
              </>
            }
            
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            <ListItem bottomDivider>
              <Avatar source={(item.bal>0) ? require('../../assets/arrow-circle-right.png'): require('../../assets/arrow-circle-left.png')} />
                <ListItem.Content>
                  <ListItem.Title>Name: {item.custNm}</ListItem.Title>
                  <ListItem.Subtitle>Duration: {openDate} - {expiDate}</ListItem.Subtitle>
                  <ListItem.Subtitle style={{color: (item.bal>0) ?'green':'red',backgroundColor: '#C8C8C8',}}>Balance: {item.curCd} {item.bal}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
          </ListItem.Accordion>
  );
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={custNo => setCustNo(custNo)}
            placeholder="Enter Cust Id"
            placeholderTextColor="black"
            autoCapitalize="none"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Button title="Search" type="outline" style={{ padding: 10 }} onPress={requestData}/>
          <Button title="More" type="solid" style={{ padding: 10 }} onPress={toggleOverlay}/>

          
          <Overlay isVisible={overlayVisible} fullScreen >
              <OverlayContent />
          </Overlay>
        </View>
       
          <SafeAreaView style={{flex: 1,height:800}}>
            <ScrollView>
            {
              data.map((l, i) => (
                <AccordianView text={l} />
              ))

            }
              </ScrollView>
          </SafeAreaView>
      </View>

      
    </SafeAreaView>
  );
};

export default InquiryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerVer: {
    flex: 1,
    flexDirection: 'column'
  },
  row:{
      flexDirection: 'row',
      justifyContent:'space-between',
      height:56,
      paddingLeft:25,
      paddingRight:18,
      alignItems:'center',
      backgroundColor: Colors.CGRAY,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'blue',
  },

});