import React from 'react';
import GiftedChat from 'react-native-gifted-chat';

class MessageScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: [],
        }
    }

    componentWilllMount() {
        this.setState({ messages: [] });
    }

    reply() {
        return {
            _id: 1,
            text: 'こんにちは( ͡° ͜ʖ ͡°)',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            }
        };
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(GiftedChat.append(previousState.messages, messages), this.reply()),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                    name: 'this.',
                    avater: 'https://placeimg.com/140/140/any'
                }}
            />
        );
    }
}

export default MessageScreen;