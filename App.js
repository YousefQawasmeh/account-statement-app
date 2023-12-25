// React Native Bridge Example to Send Direct SMS from React Native App
// https://aboutreact.com/react-native-bridge-send-direct-sms-from-react-native-app/

// import React in our code
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  NativeModules,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

var DirectSms = NativeModules.DirectSms;

const App = () => {
  // Setting up States
  // const [phone, setMobileNumber] = useState('');
  // const [isSelected, setSelection] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [messages, setMessages] = useState([
    {
      phone: '0597252561',
      name: 'يوسف القواسمي1',
      bodySMS: 'msg1',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0597252561',
      name: 'يوسف القواسمي2',
      bodySMS: 'msg2',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0599252561',
      name: 'عبدالصمد عبدالحكيم القواسمي3',
      bodySMS: 'msg3',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0597252561',
      name: 'يوسف القواسمي1',
      bodySMS: 'msg1',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0597252561',
      name: 'يوسف القواسمي2',
      bodySMS: 'msg2',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0599252561',
      name: 'يوسف القواسمي3',
      bodySMS: 'msg3',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0597252561',
      name: 'يوسف القواسمي1',
      bodySMS: 'msg1',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0597252561',
      name: 'يوسف خالد حسن القواسمي2',
      bodySMS: 'msg2',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0599252561',
      name: 'يوسف القواسمي3',
      bodySMS: 'msg3',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0597252561',
      name: 'يوسف القواسمي1',
      bodySMS: 'msg1',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0597252561',
      name: 'يوسف القواسمي2',
      bodySMS: 'msg2',
      toSend: false,
      sum: 1234,
    },
    {
      phone: '0599252561',
      name: 'يوسف القواسمي3',
      bodySMS: 'msg3',
      toSend: false,
      sum: 1234,
    },
  ]);
  // const [bodySMS, setBodySMS] = useState(
  //   'Please follow https://aboutreact.com',
  // );

  // async function to call the Java native method
  const sendDirectSms = async () => {
    if (messages.length) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'Send SMS App Sms Permission',
            message:
              'Send SMS App needs access to your inbox ' +
              'so you can send messages in background.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // DirectSms.sendDirectSms(phone, bodySMS);
          messages.forEach(({phone, bodySMS, toSend}) => {
            if (toSend) DirectSms.sendDirectSms(phone, bodySMS);
          });
          alert('SMS sent');
        } else {
          alert('SMS permission denied');
        }
      } catch (error) {
        console.warn(error);
        alert(error);
      }
    }
  };
  useEffect(() => {
    Axios.get('http://you97sef.herokuapp.com/api/getAllCustomersTotals')
      .then(({data}) => {
        setMessages(
          data.map(message => {
            message.toSend = message.to_send;
            return message;
          }),
        );
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.show(err.message || err, ToastAndroid.LONG);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle={'light-content' || 'dark-content'} /> */}
      <View
        style={{
          ...styles.checkboxContainer,
          borderBottomWidth: 1,
          paddingRight: 10,
          paddingLeft: 10,
        }}>
        <CheckBox
          style={styles.checkbox}
          value={selectAll}
          onValueChange={selectAll => {
            setSelectAll(selectAll);
            setMessages(
              messages.map((message, j) => {
                message.toSend = selectAll;
                return message;
              }),
            );
          }}
        />
        <Text style={styles.label}>تحديد الكل</Text>
      </View>
      <View
        style={{
          ...styles.checkboxContainer,
          justifyContent: 'space-between',
          paddingLeft: 50,
          paddingRight: 10,
          borderBottomWidth: 1,
        }}>
        <Text style={styles.label}>الاسم</Text>
        <Text style={styles.label}>المبلغ المطلوب</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {messages.map(({phone, name, bodySMS, toSend, sum}, i) => {
            // console.log(messages, toSend);
            return (
              <View
                style={{
                  ...styles.checkboxContainer,
                  backgroundColor: toSend ? '#eee' : '#fff',
                }}
                key={'message' + i}
                onTouchEnd={a => {
                  // console.log(a, i, toSend);
                  // messages[i].isSelected=isSelected;
                  setMessages(
                    messages.map((message, j) => {
                      if (j === i) message.toSend = !message.toSend;
                      return message;
                    }),
                  );
                }}>
                <CheckBox
                  style={styles.checkbox}
                  value={toSend}
                  onValueChange={isSelected => {
                    // console.log(isSelected, i, toSend);
                    // messages[i].isSelected=isSelected;
                    setMessages(
                      messages.map((message, j) => {
                        if (j === i) message.toSend = isSelected;
                        return message;
                      }),
                    );
                  }}
                />
                <Text style={{...styles.label, fontSize: 16}}>{name}</Text>
                <Text style={{...styles.label, marginLeft: 'auto'}}>
                  {sum + ' شيكل'}
                  {'\n'} {phone}
                </Text>
              </View>
            );
          })}
          {/* <Text style={styles.titleText}>
          React Native Bridge Example for Android to Send Direct SMS
          </Text>
          <Text style={styles.titleTextsmall}>Enter Recipients Number</Text>
          <TextInput
          value={phone}
          onChangeText={phone => setMobileNumber(phone)}
          placeholder={'Enter Conatct Number to Call'}
          keyboardType="numeric"
          style={styles.textInput}
          />
          <Text style={styles.titleTextsmall}>Enter SMS Body</Text>
          <TextInput
          value={bodySMS}
          onChangeText={bodySMS => setBodySMS(bodySMS)}
          placeholder={'Enter SMS body'}
          style={styles.textInput}
        /> */}
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={sendDirectSms}>
          <Text style={styles.buttonTextStyle}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 1,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    alignSelf: 'center',
    padding: 10,
  },
  container0: {
    // flex: 10,
    flexDirection: 'row',
    padding: 1,
    // borderWidth: 1,
    margin: 1,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default App;
