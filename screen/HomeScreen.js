import React from 'react';
import { Form,Item,Label,Input, Button, View } from 'native-base';
import { AsyncStorage,StyleSheet, Text } from 'react-native';
import firebase from '../config/firebase';
import styles from '../styles/default'
var db = firebase.firestore();
var sex={
    man: 1,
    woman: 2
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      sex:'',
      age: 0,
    }
  }

  _removeUser = () => {
    try {
        firebase.auth().signOut().then(async ()=>{
            console.log("ログアウトしました");
            await AsyncStorage.removeItem('userUid');
            await AsyncStorage.removeItem('userName');
            this.props.navigation.navigate('AuthLoading');
        }).catch( (error)=>{
            console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    } catch (error) {
      alert(error);
    }
  }

  _registerUserInfo = async () => {
    // ユーザートークン取得
    const userToken = await AsyncStorage.getItem('userUid');
    if (!userToken){
        //ユーザートークンがストレージにない場合
        this.props.navigation.navigate('AuthLoading');
    }

    var userRef=db.collection("users").doc(userToken);
    if(this._isExistDoc(userRef)){
        userRef.set({
            name: this.state.userName,
            sex: this.state.sex,
            age: this.state.age
        }, { merge: true })
    }else {
            // ユーザー情報がDBに存在しない時。
            alert("ユーザートークンが不正です。お手数ですが、ログインし直して下さい。");
    }
    // ユーザー情報を登録する。
      if (this.state.age <18){
        alert('18才以下の方のご利用はできません。');
      }
      if (this.state.sex != sex.man && this.state.sex != sex.woman ){
        alert('性別を選択して下さい');
      }
  }

_isExistDoc= (ref) =>{
    ref.get().then(function(doc){
        return doc.exists
    }).catch(function(error) {
        console.log("エラーが発生しました。", error);
    });
}

  render(){
    return (
      <View style={[styles.container, profile_styles.container]}>
            <Form>
                <Item floatingLabel>
                <Label>名前</Label>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(name) => {this.setState({userName:name})}}
                />
                </Item>
                <Item floatingLabel>
                <Label>性別</Label>
                <Input
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                </Item>
                <Item floatingLabel>
                <Label>年齢</Label>
                <Input
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(age) => {this.setState({age:age})}}
                />
                </Item>
                <Button
                full
                rounded
                danger
                style={styles.buttonContainer}
                onPress ={() => this._removeUser()}
                >
                <Text style={styles.white}>ログアウト</Text>
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

export default HomeScreen;

