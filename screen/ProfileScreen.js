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

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'Test',
      sex:'1',
      age:22,
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
    var state={
      name:this.state.userName,
      sex: this.state.sex,
      age: this.state.age
    }
    // ユーザー情報を登録する。
    if (state.age <18){
      alert('18才以下の方のご利用はできません。');
    }else if(state.sex != sex.man && state.sex != sex.woman ){
      alert('性別を選択して下さい');
    }else{
      const userData=await userRef.get()
      if(userData.exists){
        await userRef.set({
          "name": state.name,
          "sex": state.sex,
          "age": state.age
        }, { merge: true })
        await AsyncStorage.setItem('userName', state.name);
        this.props.navigation.navigate("AuthLoading");
      }else{
        // ユーザー情報がDBに存在しない時。
        alert("ユーザートークンが不正です。お手数ですが、ログインし直して下さい。");
      }
    }
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
                onPress ={() => this._registerUserInfo()}
                >
                    <Text style={styles.white}>登録</Text>
                </Button>
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

export default ProfileScreen;
