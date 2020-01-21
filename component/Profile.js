import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';

class Profile extends React.Component {
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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	}
});


export default Profile;