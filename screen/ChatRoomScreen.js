import React from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
class ChatRoomScreen extends React.Component {
    _moveToMessageScreen = (chatId) =>{
        console.log(chatId)
        this.props.navigation.navigate('Message', { id: 1234 });
    }

    render() {
        return (
        <Container>
            <Header />
            <Content>
            <List>
                <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'Image URL' }} />
                </Left>
                <Body>
                    <Text>Sankhadeep</Text>
                    <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Text>View</Text>
                    </Button>
                </Right>
                </ListItem>
                <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'Image URL' }} />
                </Left>
                <Body>
                    <Text>Sankhadeep</Text>
                    <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                    <Button
                    transparent
                    onPress ={() => this._moveToMessageScreen('test')}
                    >
                    <Text>View</Text>
                    </Button>
                </Right>
                </ListItem>
            </List>
            </Content>
        </Container>
        );
    }
}

export default ChatRoomScreen;
