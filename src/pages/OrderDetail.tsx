import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { star, starOutline, document, time } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import firebase from '../firebase';

const OrderDetail: React.FC = () => {
    const [data, setData] = useState<any>([]);
    const [dataReviewer, setDataReviewer] = useState<any>([]);
    const [payMethod, setPayMethod] = useState<string>("");
    const uriData = useParams<any>();
    const [showModal, setShowModal] = useState(false);
    const state = useLocation<any>();
    const history = useHistory();
    var time = new Date(Date.now());
    var month = ['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'December']
    var currTime = time.getDate() + ' ' + month[time.getMonth()] + ' ' + time.getFullYear();

    const payment = (id: string) => {
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Order Detail</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/Tabs/Freelancer/${uriData.id}`} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
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
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '5px' }}>
                        <h3 className="summary-detail">Status</h3>
                        <h3 className="summary-price" >On-Progress</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Total</h3>
                        <h3 className="summary-price">Rp. xxxx</h3>
                    </div>
                    {/* generate  */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="summary-detail">Order Date</h3>
                        <h3 className="summary-price">{currTime.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="summary-box ion-margin">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px', marginTop: '5px' }}>
                        <h3 style={{fontWeight: 'bold'}} className="summary-detail">Subject</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 className="summary-detail">{state.state && state.state[0]}</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 style={{fontWeight: 'bold'}} className="summary-detail">Description</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <h3 className="summary-detail">{state.state && state.state[1]}</h3>
                    </div>
                </div>
                <div className="summary-box ion-margin">
                    <h3 className="summary-detail" style={{ marginTop: '5px' }}>Delivery Files</h3>
                    <div style={{ display: "flex", marginBottom: '10px', marginTop: '5px' }}>
                        <IonIcon icon={document} />
                        <a className="summary-detail" href="" style={{ marginLeft: "5px" }} >example_page.pdf</a>
                    </div>
                    <div style={{ display: "flex", marginBottom: '10px', marginTop: '5px' }}>
                        <IonIcon icon={document} />
                        <a className="summary-detail" href="" style={{ marginLeft: "5px" }}>example_page_2.psd</a>
                    </div>
                </div>
                
                <div className="ion-margin ion-padding" style={{ display: "flex", justifyContent: "space-around" }}>
                    <IonButton className="ion-padding summary-button" >Finish Order</IonButton>
                    <IonButton className="ion-padding summary-button" >Cancel Order</IonButton>
                </div>

            </IonContent>
        </IonPage>
    );
}

export default OrderDetail;