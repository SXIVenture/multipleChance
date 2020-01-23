import React from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Satake Yusuke',
			profession: '塾長'
		};
	}

	_getUserName = () => {
		const user = firebase.auth().currentUser;
		this.setState({
			user: user.email
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imgArea}>
					<Image
          rounded
          source={require('../assets/React-icon-mini2.png')}
          style={styles.imageArea}  
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageArea: {
		width: 200,
    height: 200,
	},
	infoContent: {
		marginTop: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	name: {
		fontSize: 30,
		fontWeight: '500'
	},
	profession: {
		fontSize: 25,
		fontWeight: '200'
	}
});

export default Profile;
