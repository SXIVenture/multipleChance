import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React from 'react';
import MapView from 'react-native-maps';
import styles from '../styles/default';

class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.7922,
      longitudeDelta: 0.70521,
      element: [
        { id: 1, name: 'woman1', latitude: 34.7129086294, longitude: 135.503908158 },
        { id: 2, name: 'woman2', latitude: 34.71249087, longitude: 135.504908160 },
        { id: 3, name: 'woman3', latitude: 34.713908, longitude: 135.503908162 },
        { id: 4, name: 'woman4', latitude: 34.7149086294, longitude: 135.503908158 },
        { id: 5, name: 'woman5', latitude: 34.71549087, longitude: 135.504908162 },
        { id: 6, name: 'woman6', latitude: 34.716908, longitude: 135.501908162 },
      ],
    }
  }

  componentDidMount = () => {
    this.getLocationAsync();
  }

  // 現在地取得
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        message: '位置情報のパーミッションの取得に失敗しました。'
      })
      return
    }
    const location = await Location.getCurrentPositionAsync({});

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })

  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.013,
          longitudeDelta: 0.013,
        }}
        showsUserLocation={true}
      >
        {
          this.state.element.map(data => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude
                }}
                title={data.name}
                key={"id:" + data.id}
                pinColor="red"
              />
            );
          })
        }
      </MapView>
    );
  }
}

export default MapScreen;