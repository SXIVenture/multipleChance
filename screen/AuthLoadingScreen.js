import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userUid');
    console.log('ユーザートークン:'+userToken)
    const userName = await AsyncStorage.getItem('userName');
    console.log('ユーザ-名:'+userName)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (!userToken){
      this.props.navigation.navigate('Login');
    }else if(!userName){
      this.props.navigation.navigate('Profile');
    }else{
      this.props.navigation.navigate('App');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;