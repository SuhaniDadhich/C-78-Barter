import React, { Component } from 'react';
import {
 View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
export default class SignUpLoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }

  //function userSignUp
  usersSignUp = (emailId, password,confirmPassword) => {
    if(password!==confirmPassword){
      return Alert.alert("Password doesn't match")
    } 
    else{
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then(() => {
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.contact,
          email_id:this.state.emailId,
          address:this.state.address
        })
       return Alert.alert('User added successfully!',
       '',
       [{text:'OK',onPress:()=>this.setState({"isModalVisible":false})}]
       )
       
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  }
  }
  showModal=()=>{
    return(
      <Modal 
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}>
      <View style={styles.modalContainer}>

      <ScrollView style={{width:'100%'}}>
      <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
      <Text style={styles.modalTitle}> Registration </Text>
<TextInput 
style={styles.formTextInput}
placeholder={"First name"}
maxLength={8}
onChangeText={(text)=>{
  this.setState({
    firstName:text
  })
}}/>

<TextInput 
style={styles.formTextInput}
placeholder={"Last name"}
maxLength={8}
onChangeText={(text)=>{
  this.setState({
    lastName:text
  })
}}/>

<TextInput 
style={styles.formTextInput}
placeholder={"Contact"}
maxLength={10}
keyboardType={'numeric'}
onChangeText={(text)=>{
  this.setState({
    contact:text
  })
}}/>

<TextInput 
style={styles.formTextInput}
placeholder={"Address"}
multiline={true}
onChangeText={(text)=>{
  this.setState({
    address:text
  })
}}/>

<TextInput 
style={styles.formTextInput}
placeholder={"Email"}
keyboardType={'email-address'}
onChangeText={(text)=>{
  this.setState({
    emailId:text
  })
}}/>

<TextInput 
style={styles.formTextInput}
placeholder={"Password"}
secureTextEntry={true}
onChangeText={(text)=>{
  this.setState({
    password:text
  })
}}/>

<TextInput 
style={styles.formTextInput}
placeholder={"Confirm password"}
secureTextEntry={true}
onChangeText={(text)=>{
  this.setState({
    confirmPassword:text
  })
}}/>

<View style={styles.modalBackButton}>
<TouchableOpacity style={styles.registerButton}
onPress={()=>
  this.usersSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
}>

<Text style={styles.registerButtonText}> Register </Text>

</TouchableOpacity>

</View>
<View style={styles.modalBackButton}>
<TouchableOpacity style={styles.cancelButton}
onPress={()=>

this.setState({"isModalVisible":false})}>

<Text style={{color:'#ff5722'}}> Cancel </Text>
</TouchableOpacity>
</View>

      </KeyboardAvoidingView>
      </ScrollView>      
      </View> </Modal>

    )
  }

  
//render and return
  render() {
    return (
      <View style={styles.container}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      {this.showModal()}
      </View>
        <View>
          <Text style={styles.title}> Book Santa </Text>{' '}
        </View>
        <View>
          '
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="Enter password..."
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}>
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              this.usersSignUp(this.state.emailId, this.state.password);
            }}>
            <Text style={styles.buttonText}> SignUp </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#70dbff',
  },

  title: {
    fontSize: 50,
    fontWeight: '300',
    paddingBottom: 30,
    color: '#36007d',
    fontWeight:'bold'
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#36007d',
    fontSize: 20,
    margin: 20,
    paddingLeft: 10,
  },
  button: {
    width: 320,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#64008f',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
