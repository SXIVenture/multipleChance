import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../styles/default'

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
    }
  }

  render(){
    return (
      <View style={[styles.container, profile_styles.container]}>
			<View style={styles.infoContent}>
				<Text style={styles.bigText}>ProfilePage</Text>
			</View>
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

