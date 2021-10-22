import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC0gtT5DBfRieqfpH7ppEbmzPLVvK3TT7M",
    authDomain: "hackathon-3f.firebaseapp.com",
    projectId: "hackathon-3f",
    storageBucket: "hackathon-3f.appspot.com",
    messagingSenderId: "162291917995",
    appId: "1:162291917995:web:53c9a45d644b865a84c3ee",
    measurementId: "G-29Q7GH3GVM"
};

firebase.initializeApp(firebaseConfig);
export default firebase;