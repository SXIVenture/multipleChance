import React from 'react';
import { AsyncStorage } from 'react-native';
import firebase from '../config/firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

class MessageScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        messages: [],
        uid: ''
    }

    componentDidMount() {
        // Firestoreの「messages」コレクションを参照
        this.messageRef = firebase.firestore().collection('messages');
        // refの更新時イベントにonCollectionUpdate登録
        this.unsubscribe = this.messageRef.onSnapshot(this.onCollectionUpdate);
        // uidを取得
        const uid=this._getUid()
        this.setState({uid})
    }

    _getUid = async () => {
        const userToken = await AsyncStorage.getItem('userUid');
        return userToken
      };

    componentWillunmount() {
        // onCollectionUpdateの登録解除
        this.unsubscribe();
    }

    /*Firestoreのコレクションが更新されたとき*/
    onCollectionUpdate = (querySnapshot) => {
        // docsのdataをmessagesとして取得
        const messages = querySnapshot.docs.map((doc) => {
            return doc.data();
        }).sort(
            function (a, b) {
                return (a._id < b._id ? 1 : -1);
            }
        );
        // メッセージ時間の型変換
        messages.forEach(function(data){
            data.createdAt=data.createdAt.toDate()
        });
        this.setState({ messages });
    }

    _backToChatRoomScreen =() => {
        this.props.navigation.navigate('Chat');
    }
    // componentWilllMount() {
    //     this.setState({ messages: [] });
    // }

    onSend = (messages = []) => {
        // Firestoreのコレクションに追加
        messages.forEach((message) => {
            var dt = new Date();
            message._id=dt.getTime()+message._id;
            this.messageRef.add(message);
        });
        // onCollectionUpdateが呼ばれるので、ここではstateには渡さない
        //this.setState((previousState) => ({
        //  messages: GiftedChat.append(previousState.messages, messages),
        //}));
      }

    render() {
        return (
            <Container>
            <Header>
                <Left>
                    <Button transparent
                    onPress ={() => this._backToChatRoomScreen()}
                    >
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                <Title>Header</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            </Container>
        );
    }
}

export default MessageScreen;