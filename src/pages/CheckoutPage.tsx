import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack, backspace, star, starOutline, timeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import firebase from '../firebase';

const CheckoutPage: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [payMethod, setPayMethod] = useState<string>("");
    const uriData = useParams<any>();
    const [showModal, setShowModal] = useState(false);
    const state = useLocation<any>();
    const history = useHistory();
    var time = new Date(Date.now());
    var month = ['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'December']
    var currTime = time.getDate() + ' ' + month[time.getMonth()] + ' ' + time.getFullYear() + ' ' + time.getHours() + '.00';

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

    function handleGoBack() {
        window.history.go(-1);
    }
    const orderDetail = (id: string) => {
        var url = '/OrderDetail/Freelancer/'.concat(id);
        history.push(url, state.state);

        window.location.href = url;
    }

    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Payment</IonTitle>
                <IonButtons slot="start" >
                    <IonButton onClick={() => handleGoBack()}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
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
                    <h3 className="summary-box-title">BCA Virtual Account</h3>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">No. Virtual Account</h3>
                        <h3 className="summary-price">54564894512364</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Total</h3>
                        <h3 className="summary-price">Rp. xxxx</h3>
                    </div>
                    <hr style={{ height: "2px", borderWidth: "0", color: "gray", backgroundColor: "gray" }} />
                    {/* generate  */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">{currTime.toLocaleString()}</h3>
                        <h3 className="summary-price">{dataReviewer.tanggalOrder}</h3>
                    </div>
                    <h3 className="summary-detail">payment</h3>
                </div>
                <div className="summary-box ion-margin">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px', marginTop: '5px' }}>
                        <h3 className="summary-detail">Subject</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 className="summary-detail">{state.state && state.state[0]}</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 className="summary-detail">Description</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 className="summary-detail">{state.state && state.state[1]}</h3>
                    </div>
                </div>

                <IonButton onClick={() => { orderDetail(uriData.id) }} className="ion-padding summary-button" expand="full" >Go to Order Details</IonButton>

            </IonContent>
        </IonPage>
    );
}

export default CheckoutPage;