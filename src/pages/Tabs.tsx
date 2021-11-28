import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { home, search, personCircle } from "ionicons/icons";
import { Redirect, Route, useHistory } from "react-router";
import { useEffect, useState } from "react";
import firebase from '../firebase';

// Component
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import ProfilePage from "./ProfilePage";
import FreelancerDetail from "./FreelancerDetail";

const Tabs: React.FC = () => {
    const [userData, setUserData] = useState<any>([]);
    const [id, setId] = useState<any>();
    const history = useHistory();

    //user data
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const db = firebase.firestore();
                var docRef = db.collection("users").doc(user.uid);
                setId(user.uid);

                docRef.get()
                    .then((doc) => {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data());
                            setUserData(doc.data());
                            
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("User data missing!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            } else {
                // User is signed out
                // redirect to login page
                var url = '/LoginPage';
                history.push(url);
                window.location.href = url;
            }
        });
    }, []);

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/Tabs" to="/Tabs/Homepage" />
                <Route exact path="/Tabs/Homepage" component={HomePage} />
                <Route exact path="/Tabs/Searchpage" component={SearchPage} />
                <Route exact path="/Tabs/Profilepage/:id?">
                    <ProfilePage />
                </Route>
                <Route exact path="/Tabs/Freelancer/:id?">
                    <FreelancerDetail />
                </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="Homepage" href="/Tabs/Homepage">
                    <IonIcon icon={home}></IonIcon>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Searchpage" href="/Tabs/Searchpage">
                    <IonIcon icon={search}></IonIcon>
                    <IonLabel>Search</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Profilepage" href={"/Tabs/Profilepage/"+ (id)}>
                    <IonIcon icon={personCircle}></IonIcon>
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs;