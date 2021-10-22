import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

//theme
import './ProfilePage.css';
import { star, starOutline, location } from 'ionicons/icons';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const Payment: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [payMethod, setPayMethod] = useState<string>("Select Payment Method");
    const uriData = useParams<any>();
    const [showModal, setShowModal] = useState(false);

    const payment = (id:string) =>{
        window.location.href = "/Payment/Freelancer/".concat(id);
        setShowModal(false);
    }

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

    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                    <IonTitle className="titleMiddle">Payment</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/Tabs/Freelancer/${uriData.id}`}/>
                    </IonButtons>
            </IonToolbar>
            <IonContent fullscreen>
                <div className="profile-header-background">
                    {/* <img></img> */}
                </div>
                {/* Profile Header Content */}
                <div className="profile-header-content">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2.2" className=" ion-padding">
                                <IonAvatar className="profile-avatar">
                                    <img src={data.pic} />
                                </IonAvatar>
                            </IonCol>
                            <IonCol style={{ marginLeft: "1.5rem" }}>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <h1 className="ion-no-margin profile-name">{data.name}</h1>
                                            <p className="ion-no-margin profile-desc">{data.job}</p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                                            <p className="ion-no-margin profile-desc">Rp. {data.price}M</p>
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
                <IonItem>
                    <IonLabel>Payment Method</IonLabel>
                    <IonSelect value={payMethod} okText="Okay" cancelText="Dismiss" onIonChange={e => setPayMethod(e.detail.value)}>
                        <IonSelectOption value="bca">BCA virtual account</IonSelectOption>
                        <IonSelectOption value="mandiri">Mandiri virtual account</IonSelectOption>
                        <IonSelectOption value="bni">BNI virtual account</IonSelectOption>
                        <IonSelectOption value="btn">BTN virtual account</IonSelectOption>
                        <IonSelectOption value="danamon">Danamon virtual account</IonSelectOption>
                        <IonSelectOption value="cimb">CIMB virtual account</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Payment;
