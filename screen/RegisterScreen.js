import { Button, Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import firebase from '../config/firebase';
import styles from '../styles/default';

var db = firebase.firestore();

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'test14@gmail.com',
      password: 'nagaoka13'
    }
  }

  // ユーザー情報をauthに登録
  _createUser = (email, password) => {
    try {
      // TODO: バリデーションかける
      if (password < 6) {
        alert("Please enter more than characters");
        return;
      }
      // Auth 登録
      firebase.auth().createUserWithEmailAndPassword(email, password).then(async (result) => {
        var uid = result.user.uid;
        console.log("uid:" + uid);
        await AsyncStorage.setItem('userUid', uid);
        await this._registerUser(uid);
        this._loginUser(email, password);
      })
      alert("finished register!")
    } catch (error) {
      alert(error);
    }
  }

  _registerUser = (uid) => {
    try {
      db.collection('users').doc(uid).set({
        email: this.state.email,
        lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
      })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    } catch (error) {
      alert(error);
    }
  }

  _loginUser = (email, password) => {
    try {
      // ストレージ登録する。
      firebase.auth().signInWithEmailAndPassword(email, password).then(async (result) => {
        var uid = result.user.uid;
        const value = await AsyncStorage.getItem('userUid');
        if (value == null) {
          await AsyncStorage.setItem('userUid', uid);
          await this._updateLastLoginDate(uid);
        }
        this._moveToAuthpage();
      })
    } catch (error) {
      alert(error);
    }
  }

  _updateLastLoginDate = (uid) => {
    db.collection('users').doc(uid).update({
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
  }

  _moveToAuthpage = () => {
    this.props.navigation.navigate("AuthLoading");
  }

  render() {
    return (
      <View style={[styles.container, profile_styles.container]}>
        <Form>
          <Item floatingLabel>
            <Label>UserName</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email: email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => { this.setState({ password: password }) }}
            />
          </Item>
          <Button
            full
            rounded
            danger
            style={styles.buttonContainer}
            onPress={() => this._loginUser(this.state.email, this.state.password)}
          >
            <Text style={styles.white}>Login</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={styles.buttonContainer}
            onPress={() => this._createUser(this.state.email, this.state.password)}
          >
            <Text style={styles.white}>Register</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const profile_styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

export default RegisterScreen;

