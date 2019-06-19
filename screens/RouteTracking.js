import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    AsyncStorage
} from "react-native";
import pick from 'lodash/pick';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";


export default class RouteTracking extends Component {
    constructor(props) {
        super(props);
        this.state = { routeCoordinates: [] }
    }

    //Location
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => { },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const { routeCoordinates } = this.state
            const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
            this.setState({ routeCoordinates: routeCoordinates.concat(positionLatLngs) })
            console.log('location of device', this.setState({ routeCoordinates: routeCoordinates.concat(positionLatLngs) }))
        });
    }
    render() {
        return (
            <View>
                <MapView
                    // style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    //mapType='satellite'
                    showsUserLocation={true}
                    followUserLocation={true}
                    overlays={[{
                        coordinates: this.state.routeCoordinates,
                        strokeColor: '#00000',
                        lineWidth: 10,
                    }]}
                >
                    {/**} 
                
                    {this.state.routeCoordinates.map((marker) => (
                        <MapView.Marker coordinate={marker.coordinate} key={marker.key} />
                    ))}

                **/}
                </MapView>
            </View>
        );
    }
}