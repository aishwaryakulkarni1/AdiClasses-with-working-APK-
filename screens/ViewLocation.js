import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ToastAndroid, Image, CameraRoll, AsyncStorage, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions, createStackNavigator, createAppContainer } from "react-navigation";
import MapView, { Marker, Polyline } from 'react-native-maps';
//import pick from 'lodash/pick';
//import html2canvas from 'html2canvas';
import firebase from "firebase";
import { captureScreen } from "react-native-view-shot";
import { track_location } from "./base";
//import BackgroundTimer from 'react-native-background-timer';

let id = 0

export default class ViewLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            latitude: 18.532345,
            longitude: 73.836305,
            error: null,
            imageURI: "",
            uploadedfileurl: ""
        };
    }

    // static navigatioOptions = {
    //     title: 'My map',
    //     headerLayoutPreset: 'center'
    // }



    componentDidMount() {
        //this.setTimer()
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, error => this.setState({ error: error.message }),
            // {
            //     enableHighAccuracy: true, timeout: 20000, maximumAge: 2000
            // }
        );

        navigator.geolocation.watchPosition((position) => {
            this.setState({
                markers: [
                    ...this.state.markers, {
                        coordinate: position.coords,
                        key: id++
                    }
                ]
            }, null);
        });
        this.state = { markers: [] };
    }

    // setTimer = () => {
    //     console.log('in setTimer')
    //     BackgroundTimer.setTimeout(() => {
    //         // this will be executed once after 10 seconds
    //         // even when app is the the background
    //         console.log('In timer. This timer will run after every one hour', )
    //         var now = new Date();
    //         if (now.getHours() === 18 && now.getMinutes() === 15) {
    //             console.log('before screenshot');
    //             this.takeScreenShot();
    //             console.log('after screenshot');
    //         }

    //     }, 900000);
    // }



    // handleUploadSuccess = (filename) => {
    //     console.log('filename', filename)
    //     location.child(filename).getDownloadURL().then(url => {
    //         this.setState({ uploadedfileurl: url, msg1: "" })
    //         console.log('uploadedfileurl', url)
    //         // this.state.TeamImageData.push(url)
    //     });

    //     setTimeout(() => {

    //         // if (this.state.progress == 100) {
    //         //     this.setState({ filename: "", progress: 0 })
    //         // } else {
    //         //     console.log("error in upload")
    //         // }
    //     }, 1000)

    // };


    addMarker(region) {
        let now = new Date().getTime();
        if (this.state.lastAddedMarker > now - 5000) {
            return;
        }
        this.setState({
            markers: [
                ...this.state.markers, {
                    coordinate: region,
                    key: id++
                }
            ],
            lastAddedMarker: now
        });
    }

    // html2canvas(document.querySelector("#capture")).then(canvas => {
    //     document.body.appendChild(canvas)
    // });
    takeScreenShot = () => {
        //handler to take screnshot
        captureScreen({
            //either png or jpg or webm (Android). Defaults to png
            format: "jpg",
            //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
            quality: 0.8
        })
            .then(
            //callback function to get the result URL of the screnshot
            // uri => {this.setState({ imageURI : uri })
            uri => {
                this.setState({ imageURI: uri })
                CameraRoll.saveToCameraRoll(this.state.imageURI, 'photo')
                //         .then(
                //         this.uploadFile();
                //         )
                // .catch(err => console.log('err:', err));

                console.log('uri', this.state.imageURI);

                this.uploadFile();
                // console.log('after uploadFile method');

                //this.handleUploadSuccess(this.state.imageURI);
            },
            error => console.error("Oops, snapshot failed", error)
            );
        // console.log('unsaved uri',this.state.imageURI);
        // this.uploadFile()

        //this.props.navigation.navigate("TempUpload")
        ToastAndroid.show('Screenshot Captured & Saved to Device', ToastAndroid.LONG);
    };

    uploadFile = async () => {

        try {
            // simple function to get image uri from device
            // console.log('in fie upload')
            // const response = await  this.getimage();

            // console.log('after getImage', response)
            // use fetch API to convert the local image to a blob
            // for uploading to firebase
            console.log('in Update URI', this.state.imageURI)

            const response2 = await fetch(this.state.imageURI);
            // .then(response => { console.log('response of fetch') }).catch(err => { console.log('err', err) })
            //   let tempPath = "file:///data/user/0/com.locationtracking/cache/song.mp3".
            // console.log('temp Path', tempPath)
            // const response2 = await fetch(tempPath);

            //file:///data/user/0/com.locationtracking/cache/ReactNative-snapshot-image86289171497911915.jpg 
            console.log('After Fetch')
            console.log('response2', response2)
            const blob = await response2.blob();
            console.log('blob')
            // now that we have the blob, it is uploading to 
            // firebase as described in the documentation
            const ref = track_location.child(new Date().getTime() + "");

            // var path1="gs://adiclasses-f89d8.appspot.com/Location/" + new Date().getTime() +""
            // console.log('uploadedfileurl', path1)
            var filename = new Date().getTime() + ".jpeg"
            console.log('fileNamePath', filename)

            const task = ref.put(blob);

            task.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot =>
                    console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100),
                error => {
                    console.log("error", error);
                    return error;
                },
                result => {
                    console.log("result", task.snapshot.metadata);


                    ref.getDownloadURL().then(
                        (url) => {
                            console.log("Filepath of firebase", url);

                        })

                    // location.child(filename).getDownloadURL().then(url => {

                    //     console.log('uploadedfileurl',url)

                    //   });
                    return result;
                }
            );


        } catch (e) {
            console.log(e);
        }
    };

    addMap = () => {
        fetch('http://35.161.99.113:9000/webapi/adiPlogin/addUsersMap', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.modalName,
                mobileNumber: this.state.modalMobileNumber,
                password: this.state.modalPassword
            })
        })
            .then(data => {
                return data.json()
            })
            .then(data => {
                console.log('data', data)
                this.setState({ msg: 'User is Created' })
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    showsUserLocation
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    onRegionChange={(region) => this.addMarker(region)}

                >
                    {/*{this.state.markers.map((marker) => (
                        <Marker coordinate={marker.coordinate} key={marker.key}></Marker>
                    ))}*/}

                    <Polyline
                        coordinates={this.state.markers.map((marker) => marker.coordinate)}
                        strokeWidth={5}
                    ></Polyline>
                </MapView>
                <View style={{ marginBottom: 50 }}>
                    <Button style={styles.buttonContainer} title="Take Screenshot" onPress={this.takeScreenShot} />
                </View>

                { /* <TouchableOpacity
                    onPress={this.takeScreenShot}
                    style={{ backgroundColor: "#00ccff", padding: 10, }}
                >
                    <Text>Take Screenshot</Text>
                </TouchableOpacity> */}
                {/*  <Button style={{ marginBottom: "30px" }} title="Upload Photo" onPress={() => this.props.navigation.navigate('ImageUpload')} /> */}
                {/* <Image source={{uri : this.state.imageURI}} style={{width: 200, height: 300, resizeMode: 'contain', marginTop: 5}} /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 500,
    }
});