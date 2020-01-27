import React from 'react';
import { StyleSheet, Text,Button, View } from 'react-native';
import styles from '../styles/default'
import firebase from '../config/firebase';
import { AsyncStorage } from 'react-native';

var db = firebase.firestore();

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        email: 'test12@gmail.com',
        password:'nagaoka13'
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
      firebase.auth().createUserWithEmailAndPassword(email, password).then( async (result) => {
        var uid=result.user.uid;
        console.log("uid:"+uid);
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
            name: "testuser"
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });        
    }catch (error){
        alert(error);
    }
  }

  _loginUser = (email, password) => {
    try {
      // ストレージ登録する。
      firebase.auth().signInWithEmailAndPassword(email, password).then( async (result) => {
        var uid=result.user.uid;
        const value=await AsyncStorage.getItem('userUid');
        if (value == null){
            await AsyncStorage.setItem('userUid', uid);
        }
        this._moveToAuthpage();
      })
    } catch (error) {
      alert(error);
    }
  }

  _moveToAuthpage = () => {
    this.props.navigation.navigate("AuthLoading");
  }

  render(){
    return (
      <View style={[styles.container, profile_styles.container]}>
			<View style={styles.infoContent}>
				<Text style={styles.bigText}>ProfilePage</Text>
			</View>
            <Button
                title="詳細ページへ"
                onPress={() => this.props.navigation.navigate('Map')}
                />
            <Button
            title="ストレージに追加"
            onPress={()=>this._saveStorage()}
            />
            <Button
            title="ストレージロード"
            onPress={()=>this._loadStorage()}
            />
            <Button
            title="ログイン"
            onPress={()=>this._loginUser(this.state.email, this.state.password)}
            />
            <Button
            title="ユーザー登録"
            onPress={()=>this._createUser(this.state.email, this.state.password)}
            />
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

