import { IonPage, IonContent, IonInput, IonButton, IonApp, IonIcon } from "@ionic/react"
import { Link, useHistory } from "react-router-dom";
import { logoGoogle } from 'ionicons/icons';
import firebase from "firebase/app";
import "firebase/auth";

//assets
import logo3F from '../assets/logo.png'

//theme
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const history = useHistory();

    const SignInWithFirebase = () => {
        var google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(google_provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential as firebase.auth.OAuthCredential;;

                // // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = credential.accessToken;
                // // The signed-in user info.
                // var user = result.user;

                LoginUser(result)
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

    const LoginUser = async (result: firebase.auth.UserCredential) => {
        const db = firebase.firestore();
        const user = result.user;
        //input data kalau user baru
        if (result.additionalUserInfo?.isNewUser) {
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
                    <IonButton onClick={SignInWithFirebase} fill="outline">
                        <IonIcon size="large" icon={logoGoogle}></IonIcon>
                    </IonButton>
                </div>
            </IonContent>
        </IonApp>
    )
}

export default LoginPage;