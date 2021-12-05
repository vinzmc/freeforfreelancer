import { useEffect } from "react";
import { IonContent, IonButton, IonApp, IonIcon } from "@ionic/react"
import { Device, DeviceInfo } from "@capacitor/device";
import { useHistory } from "react-router-dom";
import { logoGoogle } from 'ionicons/icons';
import firebase from "firebase/app";
import "firebase/auth";
import { User } from 'firebase/app'
import { cfaSignIn, GoogleSignInResult } from 'capacitor-firebase-auth';


import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

//assets
import logo3F from '../assets/logo.png'

//theme
import './LoginPage.css';


const LoginPage: React.FC = () => {
    const history = useHistory();

    //signin google bukan firebase
    // const loginGoogle = async () => {
    //     try {
    //         const deviceInfo = await Device.getInfo();

    //         if ((deviceInfo as unknown as DeviceInfo).platform === "web") {
    //             console.log("Web");
    //             await GoogleAuth.init();
    //         }
    //     }
    //     finally{
    //         const googleUser = (await GoogleAuth.signIn())
    //         console.log(googleUser.authentication);
    //     }
    // }

    const SignInWithFirebase = () => {
        var google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithRedirect(google_provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential as firebase.auth.OAuthCredential;;

                // // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = credential.accessToken;
                // // The signed-in user info.
                // var user = result.user;

                LoginUser(result!)
                    .finally(
                        () => {
                            //redirect to tabs
                            var url = '/Tabs';
                            history.push(url);
                            window.location.href = url;
                        }
                    );
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    //sign in with plugin
    const SignInPlugin = () => {
        cfaSignIn('google.com')
            .subscribe((
                user: User) => LoginUser(user).finally(
                    () => {
                        //redirect to tabs
                        var url = '/Tabs';
                        history.push(url);
                        window.location.href = url;
                    }
                )
            );

    }

    // handle hasil login
    const LoginUser = async (user: User) => {
        const db = firebase.firestore();
        const result = db.collection('users').doc(user.uid).get();

        if ((await result).exists) {
            await db.collection("users")
                .doc(user?.uid).set({
                    name: user?.displayName,
                    email: user?.email,
                    photo: user?.photoURL,
                    type: 'user'
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        } else { //update profile ketika login
            await db.collection("users")
                .doc(user?.uid).set({
                    photo: user?.photoURL
                }, { merge: true })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }


    return (
        <IonApp>
            <IonContent>
                <div className="center">
                    <img src={logo3F} />
                    <h1>FreeForFreelancer</h1>
                    <p>Free To Freelance, Free To Get User</p>
                    <h2 className="title">Sign In</h2>
                    <IonButton onClick={SignInPlugin} fill="outline">
                        <IonIcon size="large" icon={logoGoogle}></IonIcon>
                    </IonButton>
                </div>
            </IonContent>
        </IonApp>
    )
}

export default LoginPage;