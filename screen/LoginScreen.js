import { Button, Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import firebase from '../config/firebase';
import styles from '../styles/default';

var db = firebase.firestore();
const profile_styles = StyleSheet.create({
    container: {
      backgroundColor: 'white'
    }
});

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'test24@gmail.com',
            password:'nagaoka13'
        }
    }
    
    render(){
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
                        onChangeText={(password) => {this.setState({password:password})}}
                    />
                    </Item>
                    <Button
                    full
                    rounded
                    danger
                    style={styles.buttonContainer}
                    onPress ={() => this._loginUser(this.state.email, this.state.password)}
                    >
                    <Text style={styles.white}>Login</Text>
                    </Button>
                    <Button
                    full
                    rounded
                    primary
                    style={styles.buttonContainer}
                    onPress={()=>this._createUser(this.state.email, this.state.password)}
                    >
                    <Text style={styles.white}>Register</Text>
                    </Button>
                </Form>
            </View>
        );
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
            firebase.auth().createUserWithEmailAndPassword(email, password).then( async (result) => {
                var uid=result.user.uid;
                await AsyncStorage.setItem('userUid', uid);
                await this._registerUser(uid);
                this._loginUser(email, password);
                })
                alert("finished register!")
            } catch (error) {
            alert(error);
            }
    }

    _registerUser =(uid) => {
        try{
            db.collection('users').doc(uid).set({
                name : null,
                email: this.state.email,
                lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(function() {
                console.log("Register User Completed");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });        
        }catch (error){
            alert(error);
        }
    }

    _loginUser = async (email, password) => {
        try {
        // ストレージ登録する。
            firebase.auth().signInWithEmailAndPassword(email, password).then( async (result) => {
                var uid=result.user.uid;
                const storageUid=await AsyncStorage.getItem('userUid');
                if (storageUid == null){
                    await AsyncStorage.setItem('userUid', uid);
                    await this._updateLastLoginDate(uid);
                }
                await this._getUserName(uid).then(async (name)=>{
                    console.log(name)
                    await AsyncStorage.setItem('userName', name);
                    this.props.navigation.navigate("AuthLoading");
                });
            })
        } catch (error) {
            alert(error);
        }
    }

    _updateLastLoginDate = async (uid) => {
        // ログイン日付の更新を行う。
        await db.collection('users').doc(uid).update({
            lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            console.log("Last login time updated");
        }).catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    _getUserName = async  (uid) => {
        var userData=await db.collection('users').doc(uid).get()
        console.log('ユーザー情報取得', userData.data().name)
        return userData.data().name;
    }

}

export default LoginScreen;

