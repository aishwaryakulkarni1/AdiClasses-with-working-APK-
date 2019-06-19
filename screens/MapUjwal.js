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
//import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import MapView from "react-native-maps";


export default class MapUjwal extends Component {


    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    };



    onRegionChange(region) {
        this.setState({region});
    }

    render() {
        return (
            <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
            />
        );
    }

}
