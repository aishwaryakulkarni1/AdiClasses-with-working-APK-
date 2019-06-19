import firebase from 'firebase/app'
import database from 'firebase/database'
import fb from 'firebase'

let app = firebase.initializeApp({
    apiKey: "AIzaSyDf5n_Yk1e0U0XoWNlTUWjdFM57ix5sXRs",
    authDomain: "adiclasses-f89d8.firebaseapp.com",
    databaseURL: "https://adiclasses-f89d8.firebaseio.com",
    projectId: "adiclasses-f89d8",
    storageBucket: "adiclasses-f89d8.appspot.com",
    messagingSenderId: "1033471789601",

});

//export let base = Rebase.createClass(app.database())
export const ref = firebase.database().ref()
export const fbs = firebase.storage().ref('image')
export const products_fbs = firebase.storage().ref('products')
export const Banner_fbs = firebase.storage().ref('Banner')
export const Chapter_fbs = firebase.storage().ref('Chapter')
export const Subject_fbs = firebase.storage().ref('Subject')
export const Test_fbs = firebase.storage().ref('Test')
export const Practice_fbs = firebase.storage().ref('Practice')
export const tixy_fbs = firebase.storage().ref('Tixy')
export const Lead_fbs = firebase.storage().ref('Lead')
export const DMS = firebase.storage().ref('DMS')
export const contract = firebase.storage().ref('contract')
export const audio_file = firebase.storage().ref('CallRecorder')
export const track_location = firebase.storage().ref('TrackLocation')

export const auth = fb.auth