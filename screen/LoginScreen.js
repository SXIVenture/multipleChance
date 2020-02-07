import firebase from 'firebase';
import { Button, Container, Content, Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../styles/default';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ','
    }
  }

  _moveToPageController = () => {
    this.props.navigation.navigate("Sub");
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter more than characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
      alert("finished register!")
    } catch (error) {
      alert(error);
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        this._moveToPageController();
      })
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Image
            source={require('../assets/React-icon-mini2.png')}
            style={styles.icon}
          />
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
                onChangeText={(password) => { this.setState({ password: password }) }}
              />
            </Item>
            <Button
              full
              rounded
              danger
              style={styles.buttonContainer}
              onPress={() => this.loginUser(this.state.email, this.state.password)}
            >
              <Text style={styles.white}>Login</Text>
            </Button>
            <Button
              full
              rounded
              primary
              style={styles.buttonContainer}
              onPress={() => this.signUpUser(this.state.email, this.state.password)}
            >
              <Text style={styles.white}>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default LoginScreen;