import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react"
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

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
        //input data kalau user baru
        if (result.additionalUserInfo?.isNewUser) {
            const db = firebase.firestore();
            const user = result.user;
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
        }
    }


    return (
        <IonPage>
            <IonContent>
                <h2 className="title">Sign In</h2>

                <div className="form-inputs">
                    <div className="ion-padding">

                        <p className="form-name">Email address</p>
                        <IonInput placeholder="Email address..." className="form-input" type="email"></IonInput>

                        <p className="form-name">Password</p>
                        <IonInput placeholder="Password..." className="form-input" type="password"></IonInput>

                        <p className="formbtn-link">Don't have an account? <Link to="/RegisterPage" className="formbtn-link-orange">Sign Up</Link></p>
                    </div>
                </div>

                <IonButton routerLink="/Tabs" className="ion-padding ion-float-right form-button">Sign In</IonButton>
                <IonButton className="ion-padding ion-float-right form-button" onClick={SignInWithFirebase}>Sign In with Google</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage;