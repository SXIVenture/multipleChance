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
		const user = firebase.auth().currentUser;
		this.setState({
			user: user.email
		});
	};

  render(){
    return (
      <View style={[styles.container, profile_styles.container]}>
        <Button
          title='get emailAddress'
          onPress={
            () => {this._getUserName()}
          }

        />
				</View>
				<View style={styles.infoContent}>
					<Text style={styles.name}>{this.state.name}</Text>
					<Text style={styles.profession}>{this.state.profession}</Text>
				</View>
			</View>
		);
	}
}

const profile_styles = StyleSheet.create({
	container: {
<<<<<<< HEAD:screen/ProfileScreen.js
		backgroundColor: 'white'
	}
});


export default ProfileScreen;

