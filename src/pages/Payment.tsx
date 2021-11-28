import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';
import { star, starOutline } from 'ionicons/icons';
import { useHistory, useLocation, useParams } from 'react-router';

//theme
import './Payment.css'

const Payment: React.FC = () => {
    const uriData = useParams<any>();
    const state = useLocation<any>();
    const history = useHistory();

    const [data, setData] = useState<any>([]);
    const [payMethod, setPayMethod] = useState<string>("");
    const [userId, setUserId] = useState<string>();

    //user data
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUserId(user.uid);
            } else {
                // User is signed out
                // redirect to login page
                var url = '/LoginPage';
                history.push(url);
                window.location.href = url;
            }
        });
    }, []);

    // freelancer data
    useEffect(() => {
        const db = firebase.firestore();
        db.collection('users')
            .doc(uriData.id)
            .onSnapshot((snapshot) => {
                const newData = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                setData(newData);
            })
    }, []);

    const checkout = async (id: string) => {
        // virtual account
        var min = 10000000000000;
        var max = 99999999999999;
        var va = Math.floor(min + (Math.random() * (max - min)));
        let url = '/CheckoutPage/Freelancer/';

        // insert data
        const db = firebase.firestore();
        await db.collection("orders")
            .add({
                bank: payMethod,
                va: va,
                freelancerName:data.name,
                freelancer: id,
                client: userId,
                created: firebase.firestore.Timestamp.fromDate(new Date()),
                status:'Finished',
                subject:state.state[0],
                description:state.state[1]
                
            })
            .then(function (docRef) {
                // console.log("Document written with ID: ", docRef.id);
                url = url.concat(docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            }).finally(() => {
                history.push(url);
                window.location.href = url;
            });
    }

    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Payment</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref={`/Tabs/Freelancer/${uriData.id}`} />
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen>
                {/* Profile Header Content */}
                <div className="profile-header-content">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2.2" className=" ion-padding">
                                <IonAvatar className="profile-avatar" style={{ top: "5px" }}>
                                    <img src={data.photo} />
                                </IonAvatar>
                            </IonCol>
                            <IonCol style={{ marginLeft: "1.5rem" }}>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>
                                            <h1 className="ion-no-margin profile-name" style={{ fontSize: "14px" }}>{data.name}</h1>
                                            <p className="ion-no-margin profile-desc" style={{ marginTop: "4px", color: "gray" }}>{data.job}</p>
                                        </div>
                                        <div>
                                            <p className="ion-no-margin profile-desc" style={{ marginRight: "12px" }}>Rp. {data.price}M</p>
                                        </div>

                                    </div>


                                    <div className="profile-reputasi">
                                        {data.length !== 0 &&
                                            [...Array(data.star)].map((x, i) =>
                                                <IonIcon icon={star} key={i} />
                                            )
                                        }
                                        {data.length !== 0 &&
                                            [...Array(5 - data.star)].map((x, i) =>
                                                <IonIcon icon={starOutline} key={5 - i} />
                                            )
                                        }
                                        <IonText className="profile-rating"> {data.star}.0</IonText>
                                        <IonText className="profile-rating"> ({data.review} Review)</IonText>
                                    </div>

                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                <div className="summary-box ion-margin">
                    <h3 className="summary-box-title">Summary</h3>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Freelancer</h3>
                        <h3 className="summary-price">Rp. {data.price} M</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Extra Service Fee</h3>
                        <h3 className="summary-price">Rp. 30,000</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Total</h3>
                        <h3 className="summary-price">Rp. xxxxxxx</h3>
                    </div>
                </div>

                <div className="summary-box ion-margin">
                    <h3 className="summary-box-title">Payment Method</h3>
                    <IonItem lines="none">
                        <IonLabel style={{ fontSize: "13px" }}>Payment Method</IonLabel>
                        <IonSelect value={payMethod} okText="Okay" cancelText="Dismiss" onIonChange={e => setPayMethod(e.detail.value)}>
                            <IonSelectOption value="BCA">BCA virtual account</IonSelectOption>
                            <IonSelectOption value="Mandiri">Mandiri virtual account</IonSelectOption>
                            <IonSelectOption value="BNI">BNI virtual account</IonSelectOption>
                            <IonSelectOption value="BTN">BTN virtual account</IonSelectOption>
                            <IonSelectOption value="Danamon">Danamon virtual account</IonSelectOption>
                            <IonSelectOption value="CIMB">CIMB virtual account</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </div>

                <IonButton onClick={() => { checkout(uriData.id) }} disabled={payMethod !== '' ? false : true} className="ion-padding summary-button" expand="full" >Confirm and Checkout</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default Payment;
