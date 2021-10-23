import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

//theme
import './ProfilePage.css';
import './Payment.css'
import { star, starOutline } from 'ionicons/icons';
import { useHistory, useLocation, useParams } from 'react-router';


const Payment: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [payMethod, setPayMethod] = useState<string>("");
    const uriData = useParams<any>();
    const [showModal, setShowModal] = useState(false);
    const state = useLocation();
    const history = useHistory();

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .doc(uriData.id)
            .onSnapshot((snapshot) => {
                const newData = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                setData(newData);
            })
    }, [])

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .doc(uriData.id)
            .collection('order')
            .onSnapshot((snapshot) => {
                const newReviewerData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setDataReviewer(newReviewerData);
            });
    }, [])

    const checkout = (id: string) => {
        var url = '/CheckoutPage/Freelancer/'.concat(id);
        history.push(url, state.state);

        window.location.href = url;
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
                                    <img src={data.pic} />
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
                            <IonSelectOption value="bca">BCA virtual account</IonSelectOption>
                            <IonSelectOption value="mandiri">Mandiri virtual account</IonSelectOption>
                            <IonSelectOption value="bni">BNI virtual account</IonSelectOption>
                            <IonSelectOption value="btn">BTN virtual account</IonSelectOption>
                            <IonSelectOption value="danamon">Danamon virtual account</IonSelectOption>
                            <IonSelectOption value="cimb">CIMB virtual account</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </div>

                <IonButton onClick={() => { checkout(uriData.id) }} disabled={payMethod !== '' ? false : true} className="ion-padding summary-button" expand="full" >Confirm and Checkout</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default Payment;
