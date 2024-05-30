import React, { useState, useEffect } from 'react';
import {
  View,  Platform, StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, FlatList,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet } from 'react-native-elements'
import axios from 'axios';
import data from '../data/TransactionHist.json'
import { ListItem, Icon, Button, Avatar } from 'react-native-elements'
import Moment from 'moment';
const TransactionScreen = ({ navigation }) => {
  Moment.locale('en');

  const [fromDate, setFromDate] = useState({date: new Date(Date.now()),mode: 'date',show: false});
  const [toDate, setToDate] = useState({date: new Date(Date.now()),mode: 'date',show: false});
  const formattedFromDate = Moment(fromDate.date).format("YYYY-MM-DD");
  const formattedToDate = Moment(toDate.date).format("YYYY-MM-DD")

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <ListItem key={item.trxId}>

        
        <Avatar source={(item.amount>0) ? require('../../assets/arrow-circle-right.png'): require('../../assets/arrow-circle-left.png')} />
        <ListItem.Content>
          <ListItem.Title>{item.type.toUpperCase()}</ListItem.Title>
          <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
          <ListItem.Subtitle style={{
          color: (item.amount>0) ?'green':'red',
          backgroundColor: '#C8C8C8',
        }}>{item.amount}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

    );
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

  const getItem = (item) => {
    //Function for click on an item
    alert('Id : ' + item.trxId + ' Title : ' + item.type);
  };
  const showFromPicker = () => {
    setFromDate({...fromDate, show: true});
  };

  const onFromChange = (event, value) => {
    const currentDate = value || fromDate.date;
    setFromDate({...fromDate, date: currentDate, show: false});
  };
  const showToPicker = currentMode  => {

    setToDate({...toDate, show: true});
  };

  const onToChange = (event, value) => {
    const currentDate = value || toDate.date;
    setToDate({...toDate, date: currentDate, show: false});
  };

  const countDate =(diff,type) =>{
    setToDate(new Date(Date.now()))
    let beginDate =  Moment(toDate.data).subtract(diff,type)
    setFromDate({...fromDate, date: beginDate, show: false});
    //setFromDate({...toDate, date: beginDate, show: false});
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.row}>
          <Text style={styles.text}> Account No: Test</Text>
          <Text style={styles.text}> ID</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> Pick The Range</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.pickedDateContainer} onPress={showFromPicker}>
            <Text style={styles.pickedDate}>
              {formattedFromDate}
            </Text>
          </TouchableOpacity>
          {fromDate.show && (
            <DateTimePicker
              initialValue={new Date()}
              format="DD-MM-YYYY"
              value={fromDate.date}
              mode={"date"}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onFromChange}
              style={styles.datePicker}
            />
          )}

          <TouchableOpacity style={styles.pickedDateContainer} onPress={showToPicker}>
            <Text style={styles.pickedDate}>
              {formattedToDate}
            </Text>
          </TouchableOpacity>
          {toDate.show && (
            <DateTimePicker
              initialValue={new Date()}
              format="DD-MM-YYYY"
              value={toDate.date}
              mode={"date"}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onToChange}
              style={styles.datePicker}
            />
          )}

          <View style={styles.btnContainer}>
            <Button title="Inquiry" color="red" />
          </View>
        </View>
        <View style={styles.row}>
            <Button title="1 Day" color="blue" onPress={() => countDate(1,'day')} />
            <Button title="1 Week" color="blue" onPress={() => countDate(1,'week')}/>
            <Button title="1 Month" color="blue" onPress={() => countDate(1,'month')}/>
            <Button title="3 Month" color="blue" onPress={() => countDate(3,'month')}/>
            <Button title="6 Month" color="blue" onPress={() => countDate(6,'month')}/>
        </View>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={true}
            renderItem={ItemView}
            ListFooterComponent={renderFooter}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickedDateContainer: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
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
  buttonFromStyle: {
    alignItems: 'flex-start',
    backgroundColor: '#DDDDDD',

    width: '40%',
    marginTop: 16,

  },
  btnContainer: {
    padding: 10,
    width: 90,
    alignItems: 'center',
  },
  buttonToStyle: {
    alignItems: 'flex-end',
    backgroundColor: '#DDDDDD',

    width: '40%',
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'blue',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});