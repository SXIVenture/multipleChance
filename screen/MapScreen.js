import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';

class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.00521,
      message:'',
    }
  }

  componentDidMount = () => {
    this.getLocationAsync();
  }

  // 現在地取得
  getLocationAsync = async() =>{
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if(status !== 'granted'){
      this.setState({
        message:'位置情報のパーミッションの取得に失敗しました。'
      })
      return
    }
  const location = await Location.getCurrentPositionAsync({});

    this.setState({
      latitude:location.coords.latitude,
      longitude: location.coords.longitude,
    })

  }

  render() {
    return (
      <MapView
            style={styles.map}
            region={{
              latitude:this.state.latitude,
              longitude:this.state.longitude,
              latitudeDelta:0.001,
              longitudeDelta:0.001,
            }}
        showsUserLocation={true}
        loadingIndicatorColor={'#213212'}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    
  },
});


export default MapScreen;