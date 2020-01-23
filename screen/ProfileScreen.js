import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styles from '../styles/default'
import firebase from 'firebase';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
    }
  }

  _getUserName = () => {
    const user = firebase.auth().currentUser
    this.setState({
      user: user.email,
    });
}

  render(){
    return (
      <View style={[styles.container, profile_styles.container]}>
        <Button
          title='get emailAddress'
          onPress={
            () => {this._getUserName()}
          }
        />
        <Text>{this.state.user}</Text>
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