/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  ScrollView,
  NativeModules
} from 'react-native';

var ApplozicChat = NativeModules.ApplozicChat;

export default class App extends Component {

  constructor(props) {
    super(props);
    /**
     * Default @state
     */
    this.state = {
      userId: '',
      email: '',
      phoneNumber: '',
      pass_word: '',
      displayName: '',
      chatIdUser: '',
      loggedIn: false,
      visible: false,
      title: 'Login/SignUp',
      mytoken: ''
    };
    /**
     * Functions Bind
     */
    this.chatLogin = this.chatLogin.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.show = this.show.bind(this);
    this.openChatWithUser = this.openChatWithUser.bind(this);
  }

  /**
   * Default render function
   */
  render() {
    let display = this.state.loggedIn;
    if (display) {
      return (
        <View style={styles.container}>
          <Text style={styles.titleText} >Chat Functionality</Text>
          <Text style={styles.btn} onPress={this.openChatWithUser}>OpenChat</Text>
          <Text style={styles.btn} onPress={this.logoutUser}>LogOut</Text>
        </View >
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.titleText}>Chat Functionality</Text>
          <TextInput style={styles.inputText}
            keyboardType="default"
            placeholder="UserId *"
            maxLength={25}
            underlineColorAndroid='transparent'
            value={this.state.userId}
            onChangeText={userId => this.setState({ userId })} />
          <TextInput type="email-address"
            style={styles.inputText}
            placeholder="Email"
            keyboardType="email-address"
            maxLength={30}
            underlineColorAndroid='transparent'
            value={this.state.email}
            onChangeText={email => this.setState({ email })} />
          <TextInput style={styles.inputText}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            underlineColorAndroid='transparent'
            maxLength={10}
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })} />
          <TextInput id="password"
            type="password"
            style={styles.inputText}
            maxLength={25}
            placeholder="Password *"
            keyboardType="default"
            underlineColorAndroid='transparent'
            value={this.state.pass_word}
            secureTextEntry={true}
            password="true"
            onChangeText={pass_word => this.setState({ pass_word })} />
          <TextInput id="displayName"
            style={styles.inputText}
            placeholder="Display Name"
            keyboardType="default"
            underlineColorAndroid='transparent'
            value={this.state.displayName}
            maxLength={25}
            onChangeText={displayName => this.setState({ displayName })} />
          <TextInput id="ChatWitUserId"
            style={styles.inputText}
            placeholder="Receiver User Id *"
            keyboardType="default"
            underlineColorAndroid='transparent'
            value={this.state.chatIdUser}
            maxLength={25}
            onChangeText={chatIdUser => this.setState({ chatIdUser })} />
          <Button title={this.state.title}
            onPress={this.show}
            color="#20B2AA" />
        </ScrollView>
      </View>
    );
  }

  /**
   * Form submit function
   * 
   * Change the title value after form submit and
   * Redirect on chatlogin function
   */
  show() {
    this.setState({ title: 'Loading....!' });
    this.chatLogin();
  }

  /**
   * 
   * Register/Login User
   * 
   * Non register user get register other wise user will get log in
   * 
   * @state int userId
   * @state string email
   * @state string contactNumber
   * @state string password
   * @state string displayName
   * 
   */
  chatLogin() {
    if (this.state.userId.length > 0 && this.state.pass_word.length > 0 && this.state.chatIdUser.length > 0) {
      let dataSend = {
        'userId': this.state.userId,
        'email': this.state.email,
        'contactNumber': this.state.phoneNumber,
        'password': this.state.pass_word,
        'displayName': this.state.displayName
      };
      ApplozicChat.login(dataSend, (error, response) => {
        if (error) {
          console.log("error " + error);
        } else {
          this.setState({ loggedIn: true, title: 'Loading...' });
        }
      })
    } else {
      this.setState({ title: 'Login/SignUp' });
      alert("Please fill all fields");
    };
  }

  /**
   * 
   * Open chat
   * 
   * To start conversion between two user only
   * 
   * @state int chatIdUser  Receiver User ID
   * 
   */
  openChatWithUser() {
    ApplozicChat.openChatWithUser(this.state.chatIdUser);
  }

  /**
   * 
   * Logout from session
   * 
   * To log out from the current session
   * And after successfully log out @state of state get reset
   * 
   */
  logoutUser() {
    ApplozicChat.logoutUser((error, response) => {
      if (error) {
        console.log("error :#" + error);
      } else {
        this.setState({
          userId: '',
          email: '',
          phoneNumber: '',
          pass_word: '',
          displayName: '',
          chatIdUser: '',
          loggedIn: false,
          title: 'Login/SignUp'
        });
      }
    });
  }
}

/**
 * 
 * Style code of app
 * 
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  btn: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center'
  },
  inputText: {
    width: 330,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 6,
    padding: 10,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  }
});